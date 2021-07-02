<template>
    <div class="modal fade" ref="Delete" data-bs-backdrop="static" data-bs-keyboard="false"
    tabindex="-1" aria-labelledby="DeleteAllLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header bg-danger text-white">
                <h5 class="modal-title text-center" id="DeleteAllLabel">確定刪除?</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    讓我想想</button>
                <button id="signOut" @click="send" type="button" class="btn btn-danger"
                  data-bs-dismiss="modal">非常低肯定!</button>
              </div>
            </div>
          </div>
        </div>
</template>
<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      Modal: '',
      item: '',
    };
  },
  methods: {
    send() {
      this.$emit('send', this.item);
    },
    // 開啟modal
    openModal(e) {
      this.item = e;
      // 開啟modal
      this.Modal.show();
    },
  },
  mounted() {
    this.Modal = new Modal(this.$refs.Delete);
  },
};
</script>
