import { v4 as uuidv4 } from 'uuid';

export function getDeviceId() {
    const key = 'DEVICE_ID';
    let deviceId = localStorage.getItem('DEVICE_ID');
    if (!deviceId) {
        deviceId = generateDeviceId();
        localStorage.setItem(key, deviceId);
    }

    return deviceId;
}


function generateDeviceId () {
    //return crypto.randomUUID();
    return uuidv4();
}

