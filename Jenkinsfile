pipeline {
    agent any

    environment {
        current_time = """${sh(
                returnStdout: true,
                script: '(date +%H%M%S)'
            )}"""
        start_time = """${sh(
                returnStdout: true,
                script: '(date -d 08:00 +%H%M%S)'
            )}"""
        end_time = """${sh(
                returnStdout: true,
                script: '(date -d 17:30 +%H%M%S)'
            )}"""
    }

    stages {
        stage('Notify Start') {
            steps {
                sh  """
                    if [[ "$current_time" > "$start_time" ]] && [[ "$current_time" < "$end_time" ]];
                       then
                    	echo notify Start
                    else
                      echo not matched
                    fi
                """
            }
        }

        stage('Clone') {
            steps {
                git branch: 'dev', credentialsId: '3c7436f6-8d07-4d18-855e-b5b6cd36d01f', url: 'https://gitlab.vietnampost.vn/groupvnpd/vnp_org_ewallet_orgweb_vue3.git'
            }
        }
        
        stage('Docker Build') {
            steps {
                dir('.') {
                    sh 'docker compose build'
                }
            }
        }
        
        stage('Docker Deploy') {
            steps {
                dir('vnp_org_ewallet_orgweb_vue3') {
                    sh 'docker stop ew-web-org || true'
                    sh 'docker rm ew-web-org || true'
                    sh 'docker run --name ew-web-org -d  --network host --memory 2048m ew-web-org:latest'
                }
            }
        }
    }

	post {
		success {
			sh  """
			    if [[ "$current_time" > "$start_time" ]] && [[ "$current_time" < "$end_time" ]];
                   then
                	echo success
                else
                  echo not matched
                fi
			"""
		}

		unsuccessful {
			sh  """
			    if [[ "$current_time" > "$start_time" ]] && [[ "$current_time" < "$end_time" ]];
                   then
                	echo unsuccessful
                else
                  echo not matched
                fi
			"""
		}
	}
}
