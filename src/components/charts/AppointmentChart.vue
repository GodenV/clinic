<template>
  <div class="main-container">
    <div class="first-stat-line">
      <div id="chart">
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div class="vertical-line"></div>
      <div class="uniq-users">
        <span class="uniq-h">
          <i class="fas fa-users"></i> Уникальных клиентов
        </span>
        <div class="uniq-info">
          <span class="col">230<br /><span>Всего</span></span>
          <div class="vertical-line"></div>
          <span class="col">35<br /><span>В этом месяце</span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "AppointmentChart",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: "Посещений",
          data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
        },
        stroke: {
          width: 7,
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "1/11/2000",
            "2/11/2000",
            "3/11/2000",
            "4/11/2000",
            "5/11/2000",
            "6/11/2000",
            "7/11/2000",
            "8/11/2000",
            "9/11/2000",
            "10/11/2000",
            "11/11/2000",
            "12/11/2000",
            "1/11/2001",
            "2/11/2001",
            "3/11/2001",
            "4/11/2001",
            "5/11/2001",
            "6/11/2001",
          ],
          tickAmount: 17,
          labels: {
            formatter: function (value, timestamp, opts) {
              return opts.dateFormatter(new Date(timestamp), "MMM");
            },
          },
        },
        title: {
          text: "Посещения 2019-2020",
          align: "left",
          style: {
            fontSize: "16px",
            color: "#666",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100],
          },
        },
        markers: {
          size: 4,
          colors: ["#FFA41B"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7,
          },
        },
        yaxis: {
          min: 0,
          max: 40,
          title: {
            text: "Посещений",
          },
        },
      },
    };
  },
};
</script>

<style lang="scss">
#chart {
  width: 70vw;
}

.main-container {
  display: flex;
  flex-direction: column;

  .first-stat-line {
    margin-top: 5vh;
    display: flex;
    flex-direction: row;

    .vertical-line {
      margin-left: 1vw;
      width: 1px;
      background-color: rgba(40, 35, 250, 0.8) !important;
    }

    .uniq-users {
      display: flex;
      flex-direction: column;
      margin-left: 2vw;
      background-color: rgba(40, 35, 250, 0.8) !important;
      width: 24vw;
      border: 0px solid;
      border-radius: 9px;

      .uniq-h {
        text-align: center;
        color: white;
        margin-top: 5vh;
        font-size: 21px;
      }

      .uniq-info {
        margin-top: 15vh;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 100%;
        color: white;
        font-size: 60px;

        .vertical-line {
          background-color: white !important;
        }

        .col {
          display: flex;
          justify-content: center;
          align-content: center;
          width: 45%;
          span{
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>