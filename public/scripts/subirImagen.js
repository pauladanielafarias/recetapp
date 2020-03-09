$("#cargar-imagen").on("change",()=>{
    let file_data = $("#cargar-imagen").prop("files")[0]
    let form_data = new FormData()
    form_data.append("image",file_data)

    $.ajax({
        url: "/",
        type:"post",
        data:form_data,
        contentType: false,
        processData:false,
        success: function(response){
            console.log(response)
            if(response.success){
                
                $("#titulo-modal").html('¿Qué hacer con tu <b style="text-transform:capitalize; color:peachpuff">'+response.class+'</b>?');
                $(".plato-modal").html(response.plato);
                $("#ingredientes-modal").html(response.ingredientes);
                $("#receta-modal").html(response.receta);
                $(".img-modal").html(response.img);
                $(".porciones").html(response.porciones);

                document.getElementsByClassName("tablink")[0].click();

                //muestra el modal
                $('#modal-resultado').modal('show');

                //agrega el boton "Abrí tu receta de nuevo" (#reopen-modal)
                document.getElementById('reopen-modal').classList.remove("w3-hide");

                //agrega el boton "Subí otra foto" (#refresh)
                document.getElementById('refresh').classList.remove("w3-hide");

                //saca el boton "Subí una foto" (#boton-imagen)
                document.getElementById('boton-imagen').classList.add("w3-hide");

                //saca el "Subiendo fotos" (#loading-img)
                document.getElementById('loading-img').classList.add("w3-hide");

            } else {
                Swal.fire({
                    title: 'No encontré tu producto',
                    text: 'Por favor, subí otra foto',
                    icon: 'warning',
                    confirmButtonText: 'Ok!'
                  });

                //saca el "Subiendo fotos" (#boton-imagen)
                document.getElementById('loading-img').classList.add("w3-hide");
                
                //agrega el boton "Subí una foto" (#boton-imagen)
                document.getElementById('boton-imagen').classList.remove("w3-hide");
                  
            }

        }
    })
})

