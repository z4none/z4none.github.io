var objectName = "Counter";
function showCounter() {
  AV.initialize(
    "YRMbeocqfOQ26SYG6bTLe8Nf-gzGzoHsz",
    "FrF9RfMGSpFjndnWJCVal9xc"
  );
  var Counter = AV.Object.extend(objectName);
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
    const query = new AV.Query(objectName);
    query.equalTo("id", id);
    query.find().then(function (counterList) {
      if (counterList.length === 0) {
        var counter = new Counter();
        counter.set("id", id);
        counter.set("title", title);
        counter.set("time", 0);
        counter.save().then(function () {
          resolve(counter);
        });
      } else {
        resolve(counterList[0]);
      }
    });
  });
}

$(function () {
  showCounter();
});
