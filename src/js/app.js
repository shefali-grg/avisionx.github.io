// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/sw.js')
//     .then(function() {
//       console.log('SW registered');
//     });
// }

var papi = "";

function refetch(){
  var screen = document.getElementById('data');
  screen.innerHTML = "";
  var alltasks=firebase.database().ref();
  alltasks.once('value',function(snapshot){
    snapshot.forEach(function(childSnapshot){
      var taskname=childSnapshot.key;
      var props=childSnapshot.val();
      var location=props["Location"];
      var time=props["Time"];
      if(time == ""){
        time = "Today";
      };
      if(location == ""){
        location = "DoIt!";
      };
      var layer1 = document.createElement("div");
      layer1.setAttribute("class", "row task");
      var layer2 = document.createElement("div");
      layer2.setAttribute("class", "col-9 head");
      var tasker = document.createElement("h3");
      tasker.innerHTML = taskname;
      tasker.onclick = function(){
        show(taskname.replace(/\s/g, "_") + '_tt');
      };
      var layer3 = document.createElement("div");
      layer3.setAttribute("class", "col-3 remove");
      var para = document.createElement("p");
      para.innerHTML = "Delete";
      para.onclick = function(){
        deleteTask(taskname);
      };
      layer3.appendChild(para);
      layer2.appendChild(tasker);
      layer1.appendChild(layer2);
      layer1.appendChild(layer3);
      screen.appendChild(layer1);

      var desc = document.createElement("div");
      desc.setAttribute("class", "desc");
      desc.setAttribute("id", taskname.replace(/\s/g, "_")+'_tt');
      var rower = document.createElement("div");
      rower.setAttribute("class", "row");
      var tasker = document.createElement("div");
      tasker.setAttribute("class", "col-10 taskname");
      var taske = document.createElement("h3");
      taske.innerHTML = taskname;
      tasker.appendChild(taske);
      rower.appendChild(tasker);
      var backer = document.createElement("div");
      backer.setAttribute("class", "col-2 back");
      backer.onclick = function(){
        show(taskname.replace(/\s/g, "_") + '_tt');
      };
      backer.innerHTML = '<span>X</span>';
      rower.appendChild(backer);
      var new_row = document.createElement("div");
      new_row.setAttribute("class", "row");
      var det1 = document.createElement("div");
      det1.setAttribute("class", "col-12 center");
      var head = document.createElement("h4");
      head.innerHTML = location + " , " + time + '<br>';
      det1.appendChild(head);
      new_row.appendChild(det1);
      var fuller = document.createElement("div");
      fuller.setAttribute("class", "row fuller");
      var centerer = document.createElement("div");
      centerer.setAttribute("class", "col-12 center");
      centerer.setAttribute("id", "cont");
      var data=props["data"];
      for (var key in data){
        var keyer = document.createElement("h5");
        keyer.setAttribute("onclick", "deleteData('" + taskname+"','"+key+"')")
        keyer.innerHTML = key;
        centerer.appendChild(keyer);
      }
      fuller.appendChild(centerer);
      var bot = document.createElement("div");
      bot.setAttribute("class", "row center bot");
      var colu = document.createElement("div");
      colu.setAttribute("class", "col-5");
      bot.appendChild(colu);
      var micer = document.createElement("div");
      micer.setAttribute("class", "col-2 micer");
      micer.innerHTML = "MIC";
      micer.onclick = function(){
        micdata(taskname);
      };
      bot.appendChild(micer);
      desc.appendChild(rower);
      desc.appendChild(new_row);
      desc.appendChild(fuller);
      desc.appendChild(bot);
      screen.appendChild(desc);
    })
  });
};

$(document).on("keypress", '#input', function(e) {
        if (e.keyCode == 13) {
          send()
        }
});

function send(){
  var text = document.getElementById('input').value;
  new_tasklist(text);
  document.getElementById('input').value = "";
};

function micdata(task){
  papi = task;
  append_me();
};

function append_me() {
  final_transcript = '';
  recognition.lang = langs[0][2];
  recognition.start();
  button_val=2;
}

function append_task(autotask){
  var currlist= papi;
  papi = "";
  var path=firebase.database().ref(currlist+"/data");
  var updates = {};
  updates['/'+currlist+'/data/'+autotask]="";
  return firebase.database().ref().update(updates);
}

function deleteTask(str){
  firebase.database().ref(str).remove();
};

function show(str){
 $("#"+str).toggle();
};

function deleteData(task,data) {
  firebase.database().ref(task+"/data/"+data).remove();
  var count = 0;
  firebase.database().ref(task).once('value',function(snap){
    snap.forEach(function(chil){
      count++;
    })
  });
  if(count == 2){
    deleteTask(task);
  }
}

// $("#topix").on('scroll', function () {
//     $('#cont').scrollTop($(this).scrollTop());
// });
//
//
// $("#cont").on('scroll', function () {
//     $('#topix').scrollTop($(this).scrollTop());
// });

// var pwaCard = document.querySelector('#pwa');
// var pwaCardContent = pwaCard.querySelector('.card__content');
// var pwaCardDetails = pwaCard.querySelector('.card__details');
// var detailsShown = false;

// pwaCard.addEventListener('click', function (event) {
//   if (!detailsShown) {
//     detailsShown = true;
//     pwaCardContent.style.opacity = 0;
//     pwaCardDetails.style.display = 'block';
//     pwaCardContent.style.display = 'none';
//     setTimeout(function () {
//       pwaCardDetails.style.opacity = 1;
//     }, 300);
//   } else {
//     detailsShown = false;
//     pwaCardDetails.style.opacity = 0;
//     pwaCardContent.style.display = 'block';
//     pwaCardDetails.style.display = 'none';
//     setTimeout(function () {
//       pwaCardContent.style.opacity = 1;
//     }, 300);
//   }
// });
