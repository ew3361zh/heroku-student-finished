<template>
    <div>
        <!-- template/html here -->
         <div class="alert alert-danger" v-if="errors.length > 0">
            <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
        </div>

        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <!-- v-model newStudentName -->
                <!-- can add v-model alongside other normal class/id info. usually good to keep in order -->
                <input id="name" class="form-control" v-model.trim="newStudentName">
            </div>
            <div class="form-group">
                <label for="starID">Star ID</label>
                <!-- v-model newStarID -->
                <input id="starID" class="form-control" v-model.trim="newStarID">
            </div>
            <!-- v-on:click event handler -->
            <button class="btn btn-primary" v-on:click="addStudent">Add</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NewStudentForm',
    emits: ['student-added'], //documents event this component emits
    data () {
        return {
            newStudentName: '',
            newStarID: '',
            errors: []
        }
    },
    methods: {
        addStudent(){
            this.errors = [] //clear previous errors to start anew

            if (!this.newStudentName) {
                this.errors.push('Student name must be entered')
            }

            if (!this.newStarID) {
                this.errors.push('StarID must be entered')
            }

            // add other checks - no duplicate starIDs e.g.

            if (this.errors.length == 0) {
            // add student
            let student = {name: this.newStudentName, starID: this.newStarID, present: false}
            // emit message to parent with new student
            this.$emit('student-added', student)

            this.newStudentName = '' //to clear the form input
            this.newStarID = ''
            }
 
        }
    }
}
</script>

<style scoped>

</style>