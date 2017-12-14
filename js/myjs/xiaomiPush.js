var mipush = api.require('mipush');
mipush.registerPush({
    appId: '2882303761517680892',
    appKey: '5701768078892'
}, function(ret) {
    alert(JSON.stringify(ret));
});
mipush.setListener(
    function(ret) {
        alert(JSON.stringify(ret));
    }
);
