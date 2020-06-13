function showCounter() {
  AV.initialize(
    "YRMbeocqfOQ26SYG6bTLe8Nf-gzGzoHsz",
    "FrF9RfMGSpFjndnWJCVal9xc"
  );
  var Counter = AV.Object.extend(name);
  $(".leancloud-visitors").each(function () {
    var id = $(this).data("id");
    var title = $(this).data("title");
    var displayOnly = $(this).data("display-only");
    var el = $(this);

    getOrCreate(Counter, id, title).then(function (counter) {
      if (displayOnly === undefined) {
        counter.increment("time", 1);
        counter.save().then(function (counter) {
          el.find(".leancloud-visitors-count").text(counter.get("time"));
        });
      } else {
        el.find(".leancloud-visitors-count").text(counter.get("time"));
      }
    });
  });
}

function getOrCreate(Counter, id, title) {
  return new Promise(function (resolve, reject) {
    const query = new AV.Query("Counter");
    query.equalTo("id", id);
    query.find().then(function (results) {
      if (results.length === 0) {
        var counter = new Counter();
        var acl = new AV.ACL();
        acl.setPublicReadAccess(true);
        acl.setWriteAccess("*", true);
        counter.setACL(acl);
        counter.set("id", id);
        counter.set("title", title);
        counter.set("time", 0);
        counter.save().then(function (counter) {
          resolve(counter);
        });
      } else {
        resolve(results[0]);
      }
    });
  });
}

$(function () {
  showCounter();
});
