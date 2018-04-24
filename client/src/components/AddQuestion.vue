<template>
  <div>
    <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#addQuestion"><strong>Add Question</strong></button>
    <div class="modal fade" id="addQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Add Question</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Title</label>
                <input v-model="title" type="text" class="form-control" id="recipient-name">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Content</label>
                <input v-model="content" type="text" class="form-control" id="recipient-name">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="createQuestion" type="button" class="btn btn-primary">Add Question</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    createQuestion () {
      let obj = {
        title: this.title,
        content: this.content
      }
      console.log(obj)
      this.addQuestion(obj)
    },
    ...mapActions([
      'addQuestion'
    ])
  }
}
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background-color: #000;
}
</style>
