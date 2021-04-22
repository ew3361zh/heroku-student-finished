import axios from 'axios'

let base_url = '/api/students' //axios will understand the 127.0.0...part is implied

export default {
    getAllStudents() {
        return axios.get(base_url).then(response => {
            return response.data //data fetched from the server
        })
    },

    addStudent(student) {
        return axios.post(base_url, student).then(response => {
            return response.data
        }) //same effect as our curl command
    },

    updateStudent(student) {
        // create url in the form of /api/students/1
        return axios.patch(`${base_url}/${student.id}`, student).then(response => {
            return response.data
        })
    },

    deleteStudent(id) {
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }


}