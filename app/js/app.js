$(document).ready(function () {
  var data = [
    {
      id: "#01",
      image: "../images/image_3.png",
      product_name: "Management guidelines",
      category: "Books",
      price: "$48",
      quantity: "0",
      status: "In stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
    {
      id: "#02",
      //   image: "",
      product_name: "Make a Card",
      category: "Simulators",
      price: "$500",
      quantity: "5",
      status: "Out of stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
    {
      id: "#03",
      image: "../images/image_3.png",
      product_name: "Management guidelines 2",
      category: "Books",
      price: "$48",
      quantity: "28",
      status: "In stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
  ];

  let table = $("#table").DataTable({
    data: data,
    pagingType: "full_numbers",
    pageLength: 9,
    language: {
      paginate: {
        first: "",
        previous: "",
        next: "",
        last: "",
      },
    },
    bLengthChange: false,
    bInfo: false,
    columns: [
      {
        data: "id",
        title: "id",
        orderable: false,
        className: "num",
      },
      {
        data: "image",
        title: "Image",
        orderable: false,
        className: "image_col",
        render: function (data) {
          let image;
          if (data === undefined || data.trim() === "") {
            image = `<div class="no-image"></div>`;
          } else {
            image = `
            <img class="image" src=${data}></div>
        `;
          }
          return image;
        },
      },
      { data: "product_name", title: "Product name" },
      { data: "category", title: "Category", className: "category" },
      { data: "price", title: "Price", orderable: false },
      { data: "quantity", title: "Quantity", orderable: false },
      {
        data: "status",
        title: "Status",
        orderable: false,
        className: "stock-status",
      },
      {
        data: "actions",
        orderable: false,
        render: function (data) {
          const action = data.map((element) => {
            return `<div class="action" data-action=${element}></div>`;
          });
          return `<div class="actions-container">${action.join("")}</div>`;
        },
      },
    ],
  });
  $(".element-availability").select2({
    minimumResultsForSearch: -1,
    width: "120px",
  });
  let categories = [];
  let stockStatus = ["In stock", "Out of stock"];
  document
    .querySelectorAll("#table tbody .category")
    .forEach((item) => categories.push(item.innerHTML));
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  $(".choose-category").select2({
    data: categories.filter(unique),
    minimumResultsForSearch: -1,
    width: "163px",
  });

  $(".choose-status").select2({
    data: stockStatus,
    minimumResultsForSearch: -1,
    width: "258px",
  });

  $(".choose-action").select2({
    minimumResultsForSearch: -1,
    width: "163px",
  });

  $(".choose-category").on("select2:select", function (e) {
    var data = e.params.data;
    table.column(3).search(data.id).draw();
  });
  $(".choose-status").on("select2:select", function (e) {
    var data = e.params.data;
    table.column(6).search(data.id).draw();
  });
  $('input[name="search-in-table"]').keyup(function (e) {
    table.search(e.target.value).draw();
  });
});
