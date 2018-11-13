var searcher = {
  init: () => {
    $("#rangoPrecio").ionRangeSlider({
      type: "double",
      grid: false,
      min: 0,
      max: 100000,
      from: 1000,
      to: 20000,
      prefix: "$"
    })

    searcher.setSearch()
    searcher.loadCities()
    searcher.loadTypes()

    $("#buscar").bind("click", () => {
      let url = "/file", params = ""
      if ($("#checkPersonalizada").is(":checked")){
        params = "?ciudad=" + $("#ciudad").val() + "&tipo=" + $("#tipo").val() + "&minimo=" + $("#rangoPrecio").val().split(';')[0] + "&maximo=" + $("#rangoPrecio").val().split(';')[1]
      }
      $.getJSON(url + params,
        (data) => {
          console.log(data)
        },
        (jqXHR, textStatus, errorThrown) => {
            console.log('error ' + textStatus + " " + errorThrown);
        }
      )
    })
  },

  setSearch: () => {
    let busqueda = $('#checkPersonalizada')
    busqueda.on('change', (e) => {
      if (this.customSearch == false) {
        this.customSearch = true
      } else {
        this.customSearch = false
      }
      $('#personalizada').toggleClass('invisible')
      $('select').toggle()
    })
  },

  loadCities:() => {
    $.getJSON("/ciudad",
      (data) => {
        $.map(data, (o, i) => {
          $("#ciudad").append('<option value="' + o + '">' + o + '</option>')
        });
      },
      (jqXHR, textStatus, errorThrown) => {
          console.log('error ' + textStatus + " " + errorThrown);
      }
    )
  },

  loadTypes:()=>{
    $.getJSON("/tipo",
      (data) => {
        $.map(data, (o, i) => {
          $("#tipo").append('<option value="' + o + '">' + o + '</option>')
        });
      },
      (jqXHR, textStatus, errorThrown) => {
          console.log('error ' + textStatus + " " + errorThrown);
      }
    )
  }
}

searcher.init()
