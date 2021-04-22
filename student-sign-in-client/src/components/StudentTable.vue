<template>
    <div>
         <div class="card student-list m-2 p-2">
            <h4 class="card-title">Student List</h4>

            <div class="edit-table-toggle form-check">
                <input type="checkbox" class="form-check-input" id="edit-table" v-model="editTable">
                <label for="edit-table" class="form-check-label">Edit table?</label>
            </div>

            <div id="student-table">
                <table class="table">
                    <tr>
                        <th>Name</th>
                        <th>StarID</th>
                        <th>Present?</th>
                        <th v-show="editTable">Delete</th>
                    </tr>

                   <!-- create table rows 
                   Each row will have a checkbox, bound to the app's data 
                   When the checkbox is checked/unchecked, the student will be signed in/out -->
                   <!-- v-bind to determine if present class (from css) should be applied based on the student's present data -->
                    <student-row 
                        v-for="student in students"
                        v-bind:student="student" 
                        v-bind:key="student.name"
                        v-bind:edit="editTable"
                        v-on:student-arrived-or-left="arrivedOrLeft"
                        v-on:delete-student="deleteStudent"
                        >
                    </student-row>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import StudentRow from '@/components/StudentRow.vue'

export default {
    name: 'StudentTable',
    components: {
        StudentRow
    },
    emits: ['student-present', 'delete-student'],
    props: {
        students: Array
    },
    data () {
        return {
            editTable: false
        }
    },
    methods: {
        arrivedOrLeft(student, present) {
            //emit message to parent
            this.$emit('student-present', student, present)
        },
        deleteStudent(student) {
            this.$emit('delete-student', student)
        }
    }
}
</script>

<style scoped> 
/* scoped means it only applies to this component */
#student-table {
    max-height: 400px;
    overflow: scroll;
}

th, tr {
    width: 33%;
}

</style>