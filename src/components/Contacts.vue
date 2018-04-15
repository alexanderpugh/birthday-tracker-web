<template>
  <div>
    <b-row>
      <b-col>
        <p>Total Budget: £{{ totalBudget }}</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="contact in contacts">
        <b-card :title=contact.name
          :img-src=contact.imageURL
          img-alt="Image"
          img-top
          style="max-width: 20rem;"
          class="mb-2">
          <p class="card-text">
            <b>WHEN: {{ contact.DOB | moment("DD MMMM") }}</b>
          </p>
          <p class="card-text">
            <b>BUDGET: £{{ contact.budget }}</b>
          </p>
          <router-link :to="'/edit/' + contact._id">
            <b-button variant="primary">EDIT</b-button>
          </router-link>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'contacts',
    computed: {
      ...mapGetters(['contacts', 'totalBudget'])
    }
  };
</script>
