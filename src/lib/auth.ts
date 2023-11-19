const AccessTokenKey = 'AppAccessToken';
export let accessToken = localStorage.getItem(AccessTokenKey);

export function getAccessToken() {
    if (accessToken) {
        return accessToken;
    }

    accessToken = localStorage.getItem(AccessTokenKey);

    return accessToken;
}

export function setAccessToken(value: string) {
    accessToken = value;
    localStorage.setItem(AccessTokenKey, value)
}

export function removeAccessToken() {
    localStorage.removeItem(AccessTokenKey);
}