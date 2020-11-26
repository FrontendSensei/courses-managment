<template>
  <div class="course-page">
    <h2>Creating course</h2>

    <form id="course" class="course__form" @submit.prevent="onSubmit">
      <div>
        <label class="course-form__label"> Name </label>
        <input
          v-model="course.name"
          type="text"
          name="name"
          placeholder="Enter name"
          class="course-form__input"
          required
        />
      </div>

      <div>
        <label class="course-form__label"> Price </label>
        <input
          v-model="course.price"
          type="number"
          name="price"
          placeholder="Enter price"
          class="course-form__input"
          required
        />
      </div>

      <div>
        <label class="course-form__label"> Date </label>
        <input
          v-model="course.date"
          type="date"
          name="date"
          class="course-form__input"
          required
        />
      </div>

      <div>
        <label class="course-form__label"> Description </label>
        <textarea
          v-model="course.description"
          name="description"
          class="course-form__input"
          required
        ></textarea>
      </div>
      <button type="submit" class="courses__btn courses__btn--blue">
        Save
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      course: {},
    }
  },
  methods: {
    onSubmit() {
      this.course.id = Date.now()
      this.$store.dispatch('courses/setCourse', this.course)
      this.$router.push('/courses')
    },
  },
}
</script>
