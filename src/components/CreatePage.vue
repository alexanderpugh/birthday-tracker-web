<template>
  <div>
    <editor :passedContact="contact" :onSave="saveContact"></editor>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment';

  import Editor from './Editor.vue';

  export default {
    name: 'create-page',
    components: {
      Editor
    },
    methods: {
      saveContact(contact) {
        (async () => {
          try {
            await this.$store.dispatch('saveNewContact', {
              token: this.token,
              data: {
                name: contact.name,
                imageURL: contact.imageURL,
                DOB: contact.DOB,
                budget: contact.budget
              }
            });

            await this.$store.dispatch('loadContacts', this.token);
            this.$router.push('/');

          } catch (err) {
            this.$parent.logout();
          }
        })();
      }
    },
    data () {
      return {
        contact: {
          name: '',
          imageURL: '',
          DOB: moment(new Date()).format('YYYY-MM-DD'),
          budget: 0
        }
      }
    },
    computed: {
      ...mapGetters(['token'])
    }
  };
</script>
