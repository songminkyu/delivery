

pm.test("Status code is 201", function() {
    const body = pm.response().json();

    pm2.environment.set("accessToken", body.accessToken);
    pm2.environment.set("refreshToken", body.refreshToken);
});