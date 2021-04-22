<template>
    <tr v-bind:class=" { present: student.present, absent: !student.present } ">
        <td>{{ student.name }}</td>
        <td>{{ student.starID }}</td>
        <td>
            <!-- $event.target is component that causes the event (checkbox), then checked value of that is boolean -->
            <input type="checkbox" 
            v-bind:checked="student.present" 
            v-on:change="arrivedOrLeft(student, $event.target.checked)">
        </td>
        <td v-show="edit"><img 
        v-on:click="deleteStudent" 
        src="@/assets/delete.png" 
        height="25" width="25"></td>
    </tr>
</template>

<script> 
export default {
    name: 'StudentRow',
    props: {
        student: Object,
        edit: Boolean
    },
    emits: ['student-arrived-or-left', 'delete-student'],
    methods: {
        arrivedOrLeft(student, present) {
            this.$emit('student-arrived-or-left', student, present)
        },
        deleteStudent() {
            if (confirm(`Delete ${this.student.name}?`)) {
            this.$emit('delete-student', this.student)
            }
        }
    }

}

</script>

<style scoped>

.present {
    color: gray;
    font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}
</style>