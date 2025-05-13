<script lang="ts">
 
 import { sendEmail } from '@/services/email.service';
import FormInput from '@/components/FormInput.vue';
import FormText from '@/components/FormText.vue';
import { defineComponent } from 'vue';
import Button from '@/components/ui/button/Button.vue'; 


export default defineComponent({
  components: {
    FormInput,
    FormText,
    Button,
  },
  data() {
    return {
      title: "Contact Us",
      showForm: true,
      successMessage: "",
      contactForm: {
        name: "",
        email: "",
        subject: "",
        message: "",
        file: null,
      },
      errors: {
        name: "",
        email: "",
        subject: "",
        message: "",
      },
    };
  },
  computed: {
    isFormValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return (
        this.contactForm.name.trim() &&
        emailRegex.test(this.contactForm.email) &&
        this.contactForm.subject.trim() &&
        this.contactForm.message.trim()
      );
    }
  },
  methods: {
    setTouched(field) {
      // Validação simples (você pode melhorar)
      if (!this.contactForm[field]) {
        this.errors[field] = "This field is required.";
      } else {
        this.errors[field] = "";
      }
    },
    onFileSelected(event) {
      this.contactForm.file = event.target.files[0];
    },
    async onSubmit() {
      if (this.isFormValid) {
        const formData = new FormData();
        formData.append('name', this.contactForm.name);
        formData.append('email', this.contactForm.email);
        formData.append('subject', this.contactForm.subject);
        formData.append('message', this.contactForm.message);
        // formData.append('file', this.contactForm.file, this.contactForm.file.name);

        try {
          const response = await sendEmail(formData);
          if (response.status === 200) {
            this.successMessage = response.data.message;
            this.showForm = false;
          } else {
            console.error('Failed to send email:', response);
          }
        } catch (error) {
          console.error('Error sending email:', error);
        }
      } else {
        console.log('Form is not valid');
      }
    }

  },
});
</script>


<template>
  <div class="container-fluid w-25">
    <div class="row justify-content-center align-items-center min-vh-100">
      <form v-if="showForm" @submit.prevent="onSubmit" enctype="multipart/form-data">
        <h2 class="mb-4">{{ title }}</h2>

        <FormInput
          label="Name"
          v-model="contactForm.name"
          :error="errors.name"
          placeholder="Your name"
          @input="setTouched('name')"
        />

        <FormInput
          label="Subject"
          v-model="contactForm.subject"
          :error="errors.subject"
          placeholder="Subject"
          @input="setTouched('subject')"
        />

        <FormInput
          type="email"
          label="Email"
          v-model="contactForm.email"
          :error="errors.email"
          placeholder="youremail@example.com"
          @input="setTouched('email')"
        />

        <FormText
          label="Message"
          v-model="contactForm.message"
          :error="errors.message"
          rows="4"
          @input="setTouched('message')"
        />

        <!--div class="form-group mb-3">
          <label for="file">Attachment (PDF, JPG, PNG only)</label>
          <input
            type="file"
            class="form-control"
            id="file"
            @change="onFileSelected"
            accept=".pdf, .jpg, .jpeg, .png"
          />
        </div-->

        <div class="d-flex justify-content-end">
          <Button
            type="submit"
            class="btn btn-primary mt-3"
            
          >
            Send email
          </Button>
        </div>
      </form>

      <div v-if="!showForm" class="alert alert-success">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>