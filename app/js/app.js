$(document).ready(function () {
  const data = [
    {
      id: "#01",
      image: "./images/image_3.png",
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
      image: "./images/image_4.png",
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
      image: "./images/image_1.png",
      product_name: "Lorem ipsum dolor sit amet",
      category: "Books",
      price: "$48",
      quantity: "0",
      status: "Out of stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
    {
      id: "#04",
      image: null,
      product_name: "Academic Membership",
      category: "Membership",
      price: "$75",
      quantity: "-",
      status: "In stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
    {
      id: "#05",
      image: "./images/image_2.png",
      product_name: "Lorem ipsum dolor sit amet",
      category: "Books",
      price: "$24",
      quantity: "15",
      status: "In stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
    {
      id: "#06",
      image: null,
      product_name: "Individual Membership",
      category: "Membership",
      price: "$400",
      quantity: "-",
      status: "In stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
    {
      id: "#07",
      image: "./images/image_5.png",
      product_name: "Student Membership",
      category: "Membership",
      price: "$50",
      quantity: "-",
      status: "In stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
    {
      id: "#08",
      image: null,
      product_name:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ligula mauris in mus amet, dolor magna.",
      category: "Simulations",
      price: "$300",
      quantity: "20",
      status: "In stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
    {
      id: "#09",
      image: null,
      product_name: "Business",
      category: "Simulations",
      price: "$100",
      quantity: "11",
      status: "In stock",
      //   status: ["In stock", "Out of stock"],
      actions: ["edit", "delete"],
    },
    {
        id: "#10",
        image: "./images/image_3.png",
        product_name: "Management guidelines",
        category: "Books",
        price: "$48",
        quantity: "0",
        status: "In stock",
        //   status: ["In stock", "Out of stock"],
        actions: ["edit", "delete"],
      },
      {
        id: "#11",
        image: "./images/image_4.png",
        product_name: "Make a Card",
        category: "Simulators",
        price: "$500",
        quantity: "5",
        status: "Out of stock",
        //   status: ["In stock", "Out of stock"],
        actions: ["edit", "delete"],
      },
      {
        id: "#12",
        image: "./images/image_1.png",
        product_name: "Lorem ipsum dolor sit amet",
        category: "Books",
        price: "$48",
        quantity: "0",
        status: "Out of stock",
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
          if (data === undefined || data === null) {
            image = `<div class="no-image"></div>`;
          } else {
            image = `
                <div class="image">
                    <img class="image" src=${data}>
                </div>
            `;
          }
          return image;
        },
      },
      {
        data: "product_name",
        title: "Product name",
        className: "name_col",
        width: "343px",
      },
      {
        data: "category",
        title: "Category",
        className: "category",
        width: "123px",
      },
      {
        data: "price",
        title: "Price",
        orderable: false,
        className: "col-r",
        width: "111px",
      },
      {
        data: "quantity",
        title: "Quantity",
        orderable: false,
        className: "col-r col-pad",
        width: "111px",
        contentPadding: "74px"
      },
      {
        data: "status",
        title: "Status",
        orderable: false,
        className: "stock-status",
        width: "154px",
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

  const chooseElem = (element, col)=>{
    $(element).on("select2:select", function (e) {
        var data = e.params.data;
        table.column(col).search(data.id).draw();
    });
  }

  chooseElem(".choose-category", 3);
  chooseElem(".choose-status", 6);

  $('input[name="search-in-table"]').keyup(function (e) {
    table.search(e.target.value).draw();
  });

  $('.actions-container [data-action="delete"]').on("click", function () {
    table.row($(this).parents("tr")).remove().draw();
  });

  const bulkActionsButton = $(".bulk-actions button");
  $('.choose-action').on("select2:select", function (e){
    console.log(e.params.data);
    if (e.params.data.id === 'del'){
        bulkActionsButton.removeAttr("disabled");
    }
  });

  bulkActionsButton.on('click', function(){
      table.clear().draw();
  })
});
