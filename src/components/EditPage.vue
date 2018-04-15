<template>
  <div v-if="editedContact">
    <editor :passedContact="editedContact" :onSave="saveContact" :onDelete="deleteContact"></editor>
  </div>
</template>

<script>
  import moment from 'moment';
  import Cookies from 'js-cookie';

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
            await this.$store.dispatch('editContact', {
              token: this.token,
              id: this.$route.params.id,
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
      },

      deleteContact() {
        (async () => {
          try {
            await this.$store.dispatch('deleteContact', {
              token: this.token,
              id: this.$route.params.id
            });

            await this.$store.dispatch('loadContacts', this.token);

            this.$router.push('/');

          } catch (err) {
            this.$parent.logout();
          }
        })();
      }
    },
    data() {
      return {
        editedContact: false,
        token: Cookies.get('BIRTHDAY_TRACKER_TOKEN')
      };
    },
    mounted() {
      (async () => {
        try {
          const contact = await this.$store.dispatch('fetchSingleContact', {
            id: this.$route.params.id,
            token: this.token
          });

          this.editedContact = {
            ...contact,
            DOB: moment(new Date(contact.DOB)).format('YYYY-MM-DD')
          };

        } catch (err) {
          console.error('err:::', err);

          this.$parent.logout();
        }
      })();
    }
  };
</script>
