const AUTH_API = process.env.REACT_APP_AUTH_API;

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

async function refreshToken() {
    if (!refreshPromise) {
        isRefreshing = true;

        refreshPromise = fetch(`${AUTH_API}/refresh`, {
            method: "POST",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Refresh failed");
            })
            .finally(() => {
                isRefreshing = false;
                refreshPromise = null;
            });
    }

    return refreshPromise;
}

export async function apiFetch(input: RequestInfo, init?: RequestInit) {
    const doRequest = () =>
        fetch(input, {
            ...init,
            credentials: "include",
        });

    let res = await doRequest();

    if (res.status !== 401) {
        return res;
    }

    try {
        await refreshToken();
    } catch {
        window.location.href = "/login";
        throw new Error("Unauthorized");
    }

    // повтор запроса после refresh
    res = await doRequest();

    return res;
}