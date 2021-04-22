<template>
  <div id="app">
    <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>
    <StudentTable
    v-bind:students="students" 
    v-on:student-present="studentArrivedOrLeft"
    v-on:delete-student="studentDeleted"
    >
    </StudentTable>
     <StudentMessage v-bind:student="mostRecentStudent"></StudentMessage>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'app',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  data () {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  mounted() {
    //load all students - make request to the API
    //mounted runs as the app is created and loads off the page
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      //this will get the very latest list of all the students
      this.$student_api.getAllStudents().then( students => {
        this.students = students
        //this.students is the vue data, students is the promise returned from api
      }).catch( err => {
        console.error('Error getting latest student list', err.response)
        alert('Unable to fetch student list!')
      })
    },
    newStudentAdded(student) {
     this.$student_api.addStudent(student).then( () => {
        this.updateStudents()
     })
     .catch( err => {
       console.log('Error fetching student list', err)
       if (err.response.data && Array.isArray(err.response.data)) {
       let msg = err.response.data.join(',')
       alert('Error adding student\n' + msg)
       } else {
         console.error('Error adding student', err.response)
         alert('Sorry, unable to add student')
       }
     })
    },
    studentArrivedOrLeft(student, present) {
      student.present = present // update present value
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      }).catch( err => { 
        console.error('Error updating student', err.response)
        alert('Unable to update student')
      })
    },
    studentDeleted(student) {
     this.$student_api.deleteStudent(student.id).then( () => {
       this.updateStudents()
       this.mostRecentStudent = {} //clear welcome/goodbye student message
     }).catch( err => {
     console.error('Error deleting student', err.response)
     alert('Unable to delete student')
     })

    }
  }
}

</script>

<style>
/* as the parent, putting this bootstrap style import here will make the styles apply to all the children pieces as well */
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
</style>
