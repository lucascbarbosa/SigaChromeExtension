
function EventData(name, day, starttime, endtime, place){
    this.name      = name;
    this.day       = day;
    this.starttime = starttime;
    this.endtime   = endtime;
    this.place     = place;
}

function getDaysBetweenDates(start, end, dayName) {
    var result = [];
    var days   = {dom:0,seg:1,ter:2,qua:3,qui:4,sex:5,sab:6};
    var day    = days[dayName.toLowerCase().substr(0, 3)];

    // Copy start date
    var current = new Date(start);

    // Shift to next of required days
    current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);

    // While less than end date, add dates to result array
    while (current < end) {
      var date  = new Date(+current)
      var month = date.getMonth() + 1; //months from 1-12
      var day2  = date.getDate();
      var year  = date.getFullYear();

      newdate = year + '-' + month.toString().padStart(2,'0') + "-" + day2.toString().padStart(2,'0');
      result.push(newdate);
      current.setDate(current.getDate() + 7);
    }
    return result;  
  }

function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

function extractSiga(){
    let coursesfinal = []
    let postproc;
    let place;
    let courses = document.getElementsByClassName('tituloAcaoExtensao'); // HTML Element Array with all classes

    let numdays;
    let daysandplaces = document.getElementsByClassName('gnosys-item-visualizacao '); // Array with all class days and places

    let currenttime = 0;

    let tempname;
    let classdp = []; // class days and places

    for (let i = 0; i < courses.length; i++){

        classdp  = []
        tempname = courses[i].innerHTML.trim();

        var textArray = tempname.split('-')
        if(textArray.length>2){
            tempname = textArray.slice(0,2).join('-').trim()
        }

    textArray = tempname.split(' - ')
        if(textArray.length>1){
            textarr  = textArray.reverse();
            tempname = textarr.join(' - ').trim()
        }

        numdays = document.getElementsByClassName('detalhesAcaoExtensao')[i].childNodes.length - 1
        for (k=0; k<numdays; k++){
            currenttime += k // pegar o item de days and places correspondente a essa aula (pq o array de daysandplaces
            // não sabe a relacao entre os dias e aulas)

            preproc  = daysandplaces[currenttime].innerHTML
            postproc = preproc.split('-')
            if(postproc.length>2){
                postproc = postproc.slice(0,2).join('-').trim()
            }

            place = postproc.split(')')
            place = place.slice(-1).join('').trim()

            let temp = postproc.split(')')
            postproc = temp.slice(0,1).join('').trim() + ")"

            classdp.push(postproc);

            let day       = postproc.slice(1,4);
            let starttime = postproc.slice(5,10) + ":00-03:00";
            let endtime   = postproc.slice(13,18)+ ":00-03:00";

            datearray = getDaysBetweenDates(new Date(), addMonths(new Date(), +4), day);
            for (q=0; q<datearray.length; q++){
                eventdata = new EventData(tempname, datearray[q],starttime,endtime, place)
              
            coursesfinal.push(eventdata);
            }

        }

        currenttime++;
    }
    console.log('calculando...')
    console.log(coursesfinal)
    return coursesfinal
}

coursesfinal = extractSiga();

function addEvent(course) {
    var title     = course['name'].split(' ').join('%20')
    var date      = course['day'].split('-').join('')
    var location  = course['place'].split(' ').join('%20')
    var startHour = course['starttime'].split(':')
    var hour_min  = startHour.slice(0, 2).join('')
    var secs      = startHour[2].split('-')[0]

    startHour = hour_min + secs

    var stopHour  = course['endtime'].split(':')
    var hour_min  = stopHour.slice(0, 2).join('')
    var secs      = stopHour[2].split('-')[0]

    stopHour = hour_min + secs

    var url = 'https://calendar.google.com/calendar/r/eventedit?location=' + location + '&text=' + title + '&dates=' + date + 'T' + startHour + '/' + date + 'T' + stopHour
    console.log(url)
    window.open(url)

}

for (let i = 0; i < coursesfinal.length; i++) {
    var course = coursesfinal[i];

    addEvent(course)

    sleep(30000)
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

