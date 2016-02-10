function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}


Cat.prototype.cuteStatement = function(){
  console.log(this.owner + " loooooooves " + this.name);
};

function Student(fname,lname) {
  this.name = fname + " " + lname;
  this.courses = [];
}

Student.prototype.enroll = function(course) {
  if (this.courses.indexOf(course) < 0) {
    this.courses.push(course);
    course.addStudent(this);
  }
};

Student.prototype.courseLoad = function() {
  // TODO ask about dumb thing in here (it's about the plus equals)
  var courseLoadHash = {};
  for (var i = 0; i < this.courses.length; i++) {
    var dept = this.courses[i].dept;
    // debugger;
      if (courseLoadHash[dept] === undefined){
      courseLoadHash[dept] = this.courses[i].numCredits;
    } else {
      courseLoadHash[dept] += this.courses[i].numCredits;
    }
  }
  return courseLoadHash;
};

function Course(courseName, dept, numCredits) {
  this.courseName = courseName;
  this.dept = dept;
  this.numCredits = numCredits;
  this.students = [];
}

Course.prototype.addStudent = function(student){
  this.students.push(student);
};
