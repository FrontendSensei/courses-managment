<template>
  <div class="courses-page">
    <h2>Courses</h2>

    <div class="courses-sort-panel">
      <nuxt-link
        to="/courses/add"
        class="courses__btn courses__btn--add courses__btn--blue"
      >
        Add Course
      </nuxt-link>

      <div>
        <span>Sort by:</span>
        <input
          id="byDate"
          class="courses-sort-panel__input"
          type="radio"
          hidden
        />
        <label
          for="byDate"
          class="courses__btn"
          @click="setActiveSort('date', 'date')"
        >
          Date
        </label>

        <input
          id="byPrice"
          class="courses-sort-panel__input"
          type="radio"
          hidden
        />
        <label
          for="byPrice"
          class="courses__btn"
          @click="setActiveSort('number', 'price')"
        >
          Price
        </label>
      </div>
    </div>

    <section class="courses-list">
      <header class="courses-list__head">
        <div class="courses-list__col courses-list__col--3">Name</div>
        <div class="courses-list__col courses-list__col--3">Price</div>
        <div class="courses-list__col courses-list__col--3">Date</div>
        <div
          class="courses-list__col courses-list__col--3 courses-list__col--content-center"
        >
          Actions
        </div>
      </header>

      <div class="courses-list__body">
        <div v-if="!paginatedData.length">Courses not found</div>

        <div
          v-for="course in paginatedData"
          :key="course.id"
          :data-id="course.id"
          class="courses-list__item"
          @click="deleteCourseHandler"
        >
          <div class="courses-list__col courses-list__col--3">
            {{ course.name }}
          </div>
          <div class="courses-list__col courses-list__col--3">
            {{ course.price }}
          </div>
          <div class="courses-list__col courses-list__col--3">
            {{ course.date }}
          </div>
          <div
            class="courses-list__col courses-list__col--3 courses-list__col--content-center"
          >
            <nuxt-link
              :to="'/courses/' + course.id"
              class="courses__btn courses__btn--show courses__btn--blue"
            ></nuxt-link>
            <button
              type="button"
              :data-id="course.id"
              class="js-course-delete courses__btn courses__btn--delete courses__btn--red"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <button
      class="courses__btn courses__btn--blue"
      :disabled="pageNumber === 0"
      @click="prevPage"
    >
      Previous
    </button>
    <button
      class="courses__btn courses__btn--blue"
      :disabled="pageNumber >= pageCount - 1"
      @click="nextPage"
    >
      Next
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      pageNumber: 0,
      itemsCount: 2,
      activeSort: {},
    }
  },
  computed: {
    ...mapGetters({
      courses: 'courses/courses',
    }),
    sortedCourses() {
      return this.sortObjectEntries(
        this.courses,
        this.activeSort.type,
        this.activeSort.field
      )
    },
    paginatedData() {
      const start = this.pageNumber * this.itemsCount
      const end = start + this.itemsCount

      if (this.activeSort.type) {
        return this.sortedCourses.slice(start, end)
      }

      return Object.entries(this.courses)
        .slice(start, end)
        .map((course) => course[1])
    },
    pageCount() {
      const length = Object.keys(this.courses).length
      const count = this.itemsCount
      return Math.ceil(length / count)
    },
  },
  methods: {
    ...mapActions({
      deleteCourse: 'courses/deleteCourse',
      setCourses: 'courses/setCourses',
    }),
    deleteCourseHandler(event) {
      if (!event.target.classList.contains('js-course-delete')) return
      this.deleteCourse(+event.target.dataset.id)
      this.updatePaginationPage()
    },
    updatePaginationPage() {
      if (this.pageCount >= 1 && !this.paginatedData.length) {
        this.prevPage()
      }
    },
    nextPage() {
      this.pageNumber++
    },
    prevPage() {
      this.pageNumber--
    },
    setActiveSort(type, field) {
      this.activeSort = {
        type,
        field,
      }
    },
    sortObjectEntries(obj, type, field) {
      return Object.entries(obj)
        .sort(this.sortMethods(field)[type])
        .map((entry) => entry[1])
    },
    sortMethods(field) {
      return {
        number: (a, b) => b[1][field] - a[1][field],
        date: (a, b) => new Date(b[1][field]) - new Date(a[1][field]),
      }
    },
  },
}
</script>
