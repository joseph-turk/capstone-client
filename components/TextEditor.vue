<template>
  <div
    v-quill:myQuillEditor="editorOption"
    :content="content"
    class="quill-editor"
    @change="onEditorChange($event)"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      content: this.value,
      editorOption: {
        modules: {
          toolbar: [
            [{ header: [false, 3, 4] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['clean']
          ]
        },
        placeholder: 'Enter a description...'
      }
    }
  },

  methods: {
    onEditorChange ({ editor, html, text }) {
      this.content = html
      this.$emit('input', this.content)
    }
  }
}
</script>
