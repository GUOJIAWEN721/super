var e = {
    checkbox: ["layui-form-checkbox", "layui-form-checked", "checkbox"],
    _switch: ["layui-form-switch", "layui-form-onswitch", "switch"]
},
    t = $('#aui-slide').find("input[type=checkbox]"),
    a = function (e, t) {
        var a = $(this);
        e.on("click", function () {
            var i = a.attr("lay-filter"),
                n = (a.attr("lay-text") || "").split("|");
            a[0].disabled || (a[0].checked ? (a[0].checked = !1, e.removeClass(t[1]).find("em").text(n[1])) : (a[0].checked = !0, e.addClass(t[1]).find("em").text(n[0])), layui.event.call(a[0], l, t[2] + "(" + i + ")", {
                elem: a[0],
                value: a[0].value,
                othis: e
            }))
        })
    };
t.each(function (t, n) {
    var l = $(this),
        r = l.attr("lay-skin"),
        s = (l.attr("lay-text") || "").split("|"),
        u = this.disabled;
    "switch" === r && (r = "_" + r);
    var c = e[r] || e.checkbox;
    if ("string" == typeof l.attr("lay-ignore"))
        return l.show();
    var d = l.next("." + c[0]),
        f = $(['<div class="layui-unselect ' + c[0] + (n.checked ? " " + c[1] : "") + (u ? " layui-checkbox-disbaled " + o : "") + '" lay-skin="' + (r || "") + '">', {
            _switch: "<em>" + ((n.checked ? s[0] : s[1]) || "") + "</em><i></i>"
        }[r] || (n.title.replace(/\s/g, "") ? "<span>" + n.title + "</span>" : "") + '<i class="layui-icon">' + (r ? "&#xe605;" : "&#xe618;") + "</i>", "</div>"].join(""));
    d[0] && d.remove(), l.after(f), a.call(this, f, c)
})