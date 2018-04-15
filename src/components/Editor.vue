<template>
  <div>
    <b-form @submit="onSubmit">

      <b-form-group id="contactname"
        label="Name:"
        label-for="contactnameinput">
        <b-form-input id="contactnameinput"
          type="text"
          v-model="contact.name"
          required
          placeholder="Enter name">
        </b-form-input>
      </b-form-group>

      <b-form-group id="dob"
        label="Date of birth:"
        label-for="dobinput">
        <b-form-input id="dobinput"
          type="date"
          v-model="contact.DOB"
          required
          placeholder="Enter DOB">
        </b-form-input>
      </b-form-group>

      <b-form-group id="imageurl"
        label="Image url:"
        label-for="imageurlinput">
        <b-form-input id="imageurlinput"
          type="text"
          v-model="contact.imageURL"
          placeholder="Enter image url">
        </b-form-input>
      </b-form-group>

      <b-img v-bind:src="contact.imageURL" center fluid />

      <b-form-group id="budget"
        label="Budget:"
        label-for="budgetinput">
        <b-form-input id="budgetinput"
          type="number"
          v-model="contact.budget"
          min="0"
          step=".01"
          placeholder="Enter budget">
        </b-form-input>
      </b-form-group>

      <b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form-group>

      <b-form-group v-if="onDelete">
        <b-button type="button" variant="danger" v-on:click="handleOnDelete()">Delete</b-button>
      </b-form-group>

    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'editor',
    props: ['passedContact', 'onSave', 'onDelete'],
    data() {
      return {
        contact: this.passedContact
      }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault();

        this.onSave(this.contact);
      },
      handleOnDelete() {
        this.onDelete();
      }
    }
  };
</script>
