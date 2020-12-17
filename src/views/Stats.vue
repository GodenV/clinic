<template>
  <div>
    <Navbar />
    <div class="stat-header first">
      <span><i class="fas fa-calendar-check"></i> Посещения</span>
    </div>
    <AppointmentChart />
    <div class="stat-header">
      <span><i class="fas fa-stethoscope"></i> Отделения</span>
    </div>
    <div class="departments">
      <div class="dep-stat">
        <span class="all-dep"> <i class="fas fa-users"></i> Отделений </span>
        <div class="new-dep">
          <span class="col">7<br /><span>Всего</span></span>
          <div class="vertical-line"></div>
          <span class="col">3<br /><span>Новых</span></span>
        </div>
      </div>
      <div class="vertical-line"></div>
      <DepartmentsColumnChart />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import AppointmentChart from "@/components/charts/AppointmentChart";
import DepartmentsColumnChart from "@/components/charts/DepartmentsColumnChart";

export default {
  components: {
    Navbar,
    AppointmentChart,
    DepartmentsColumnChart,
  },
  name: "Stats",
  data: function () {
    return {};
  },
  metaInfo: {
    title: "Статистика",
    titleTemplate: "%s | Статистика",
  },
};
</script>

<style lang="scss">
.first {
  margin-top: 15vh !important;
}

.stat-header {
  margin-top: 10vh;
  margin-left: 2vw;
  width: 30vw;
  color: rgba(40, 35, 250, 0.8);
  font-size: 25px;
  border-bottom: 1px solid rgba(40, 35, 250, 0.8);
}

.departments {
  display: flex;
  flex-direction: row;
  margin-top: 5vh;
  margin-bottom: 5vh;

  .vertical-line {
    margin-left: 1vw;
    margin-right: 1vw;
    width: 1px;
    background-color: rgba(40, 35, 250, 0.8) !important;
  }

  .dep-stat {
    display: flex;
    flex-direction: column;
    margin-left: 2vw;
    background-color: rgba(40, 35, 250, 0.8) !important;
    width: 24vw;
    border: 0px solid;
    border-radius: 9px;

    .all-dep {
      text-align: center;
      color: white;
      margin-top: 5vh;
      font-size: 21px;
    }

    .new-dep {
      margin-top: 15vh;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 100%;
      color: white;
      font-size: 60px;

      .vertical-line {
        width: 1px;
        height: 100%;
        background-color: white !important;
      }

      .col {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 45%;
        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>