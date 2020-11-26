<template>
  <div class="course-page">
    <h2 v-once>{{ course.name }} (id: {{ course.id }})</h2>

    <form id="course" class="course__form" @submit.prevent="onSubmit">
      <div>
        <label class="course-form__label"> Name </label>
        <input
          v-model="course.name"
          type="text"
          name="name"
          placeholder="Enter name"
          class="course-form__input"
        />
      </div>

      <div>
        <label class="course-form__label"> Price </label>
        <input
          v-model="course.price"
          type="text"
          name="price"
          placeholder="Enter price"
          class="course-form__input"
        />
      </div>

      <div>
        <label class="course-form__label"> Date </label>
        <input
          v-model="course.date"
          type="date"
          name="date"
          class="course-form__input"
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
    </form>

    <button type="submit" class="courses__btn courses__btn--blue" form="course">
      Save
    </button>
    <button
      type="button"
      class="courses__btn courses__btn--red"
      @click="deleteCourseHandler"
    >
      Delete course
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      course: {},
    }
  },
  created() {
    this.course = {
      ...this.$store.getters['courses/course'](+this.$route.params.id),
    }
  },

  methods: {
    ...mapActions({
      setCourse: 'courses/setCourse',
      deleteCourse: 'courses/deleteCourse',
    }),
    onSubmit() {
      this.setCourse(this.course)
      this.redirect()
    },
    deleteCourseHandler() {
      this.deleteCourse(+this.$route.params.id)
      this.redirect()
    },
    redirect() {
      this.$router.push('/courses')
    },
  },
}
</script>
