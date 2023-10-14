﻿document.addEventListener('DOMContentLoaded', function () {

    var fomulario = document.getElementById('formCompra');

    var NumeroFactura = document.getElementById('NumeroFactura');
    var Empleado = document.getElementById('Empleado')
    var Proveedor = document.getElementById('Proveedor');

    var EmpleadoFeedback = document.getElementById('EmpleadoFeedback');
    var NumeroFeedback = document.getElementById('NumeroFeedback');
    var ProveedorFeedback = document.getElementById('ProveedorFeedback');

    


    function EnvioCompra(event) {
        event.preventDefault();

        // Validar si la tabla de detalles de compra está vacía

        if (fomulario.checkValidity() && !NumeroFactura.classList.contains('is-invalid') && !Empleado.classList.contains('is-invalid') && !Proveedor.classList.contains('is-invalid')) {
            const tablaDetallesCompra = document.querySelector('.tablaDetallesCompra');
            if (tablaDetallesCompra.rows.length <= 1) {
                // Mostrar la SweetAlert de error
                Swal.fire({
                    title: 'Ups...',
                    timer: 2700,
                    text: 'Debes agregar al menos un insumo antes de confirmar la compra.',
                    icon: 'error',
                    showConfirmButton: false,
                });

                // Detener la ejecución del código o realizar alguna acción adicional si es necesario
                return;
            } else {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Compra registrada',
                    timer: 2400,
                    icon: 'success',
                    showConfirmButton: false,
                }).then((result) => {
                    console.log('Formulario válido');
                    fomulario.removeEventListener('submit', EnvioCompra);
                    fomulario.submit();
                });
            }
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Formulario inválido'
            });
            console.log('Formulario inválido');
            validarNumeroFactura();
            validarProveedor();
            validarEmpleado()
        }
    }

    fomulario.addEventListener('submit', EnvioCompra);


    NumeroFactura.addEventListener('input', function () {
        validarNumeroFactura();
    });

    Empleado.addEventListener('change', function () {
        validarEmpleado();
    });

    Proveedor.addEventListener('change', function () {
        validarProveedor();
    });

    function validarProveedor() {
        // Obtener el valor seleccionado del campo select
        var ProveedorSeleccion = Proveedor.value;

        // Restablecer los estilos y mensajes de validación
        Proveedor.classList.remove('is-invalid', 'is-valid');
        ProveedorFeedback.textContent = '';

        // Validar si no se ha seleccionado ninguna opción
        if (ProveedorSeleccion === '') {
            Proveedor.classList.add('is-invalid');
            ProveedorFeedback.textContent = 'Por favor, elige una opción.';
        } else {
            // El campo es válido
            Proveedor.classList.add('is-valid');
        }
    }

    function validarEmpleado() {
        // Obtener el valor seleccionado del campo select
        var EmpleadoSeleccion = Empleado.value;

        // Restablecer los estilos y mensajes de validación
        Empleado.classList.remove('is-invalid', 'is-valid');
        EmpleadoFeedback.textContent = '';

        // Validar si no se ha seleccionado ninguna opción
        if (EmpleadoSeleccion === '') {
            Empleado.classList.add('is-invalid');
            EmpleadoFeedback.textContent = 'Por favor, elige una opción.';
        } else {
            // El campo es válido
            Empleado.classList.add('is-valid');
        }
    }


    function validarNumeroFactura() {
        var numFactura = NumeroFactura.value;

        // Restablecer los estilos y mensajes de validación
        NumeroFactura.classList.remove('is-invalid', 'is-valid');
        NumeroFeedback.textContent = '';

        // Validar si el campo está vacío
        if (numFactura.trim() === '') {
            NumeroFactura.classList.add('is-invalid');
            NumeroFeedback.textContent = 'Por favor ingrese el código de la factura.';
        }
        // Validar longitud del nombre
        else if (numFactura.length < 3 || numFactura.length > 20) {
            NumeroFactura.classList.add('is-invalid');
            NumeroFeedback.textContent = 'El código debe tener entre 3 y 20 caracteres.';
        } else if (/[^a-zA-Z0-9\s]/.test(numFactura)) {
            NumeroFactura.classList.add('is-invalid');
            NumeroFeedback.textContent = 'No se pueden ingresar caracteres especiales.';
        }
        else {
            // El campo es válido
            NumeroFactura.classList.add('is-valid');

            // Validar si el número de factura está duplicado
            $.ajax({
                type: 'GET',
                url: '/Compras/NumeroFacturaDuplicado',
                data: { NumeroFactura: numFactura },
                success: function (result) {
                    if (result === true) {
                        NumeroFactura.classList.add('is-invalid');
                        NumeroFeedback.textContent = 'No se puede repetir el número de factura.';
                    } else {
                        NumeroFactura.classList.add('is-valid');
                    }
                },
                error: function () {
                    // Manejo de errores si la solicitud falla
                    console.log('Error en la solicitud AJAX');
                }
            });
        }
    }

    
}); // Aquí se agrega el paréntesis de cierre

document.addEventListener('DOMContentLoaded', function () {

    var fomularioAgregar = document.getElementById('formAgregar');

    var InsumoCompra = document.getElementById('Item1_IdInsumo');
    var CantidadCompra = document.getElementById('CantidadCompra')
    var MedidaCompra = document.getElementById('MedidaCompra');
    var PrecioCompra = document.getElementById('PrecioCompra');

    var InsumoFeedback = document.getElementById('InsumoFeedback');
    var CantidadFeedback = document.getElementById('CantidadFeedback');
    var MedidaFeedback = document.getElementById('MedidaFeedback');
    var PrecioFeedback = document.getElementById('PrecioFeedback');

    var DivBotonAgregar = document.querySelector('.DivBotonAgregar');
    var divBotonInsumo = document.querySelector('.divBotonInsumo');




    function EnvioDetalle(event) {
        event.preventDefault();
        if (fomularioAgregar.checkValidity() && !InsumoCompra.classList.contains('is-invalid') && !CantidadCompra.classList.contains('is-invalid') && !MedidaCompra.classList.contains('is-invalid') && !PrecioCompra.classList.contains('is-invalid')) {
            console.log('Formulario válido');
            fomularioAgregar.removeEventListener('submit', EnvioDetalle);
            fomularioAgregar.submit();
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Formulario inválido'
            });
            console.log('Formulario inválido');
            cambiarClaseBotonAgregar();
            cambiarClaseBotonInusumo();
            validarInsumoCompra();
            validarCantidadCompra();
            validarMedidaCompra();
            validarPrecioCompra();
        }
    }

    fomularioAgregar.addEventListener('submit', EnvioDetalle);

    function cambiarClaseBotonAgregar() {
        var DivBotonAgregar = document.querySelector('.DivBotonAgregar');
        if (DivBotonAgregar) {
            DivBotonAgregar.classList.remove('align-items-end');
            DivBotonAgregar.classList.add('align-items-center');
        }
    }

    function cambiarClaseBotonInusumo() {
        var divBotonInsumo = document.querySelector('.divBotonInsumo');
        if (divBotonInsumo) {
            divBotonInsumo.classList.remove('align-items-end');
            divBotonInsumo.classList.add('align-items-center');
        }
    }

    function restaurarClaseBotonAgregar() {
        var DivBotonAgregar = document.querySelector('.DivBotonAgregar');
        if (DivBotonAgregar) {
            DivBotonAgregar.classList.add('align-items-end');
            DivBotonAgregar.classList.remove('align-items-center');
        }
    }

    function restaurarClaseBotonInusumo() {
        var divBotonInsumo = document.querySelector('.divBotonInsumo');
        if (divBotonInsumo) {
            divBotonInsumo.classList.add('align-items-end');
            divBotonInsumo.classList.remove('align-items-center');
        }
    }

    InsumoCompra.addEventListener('change', function () {
        validarInsumoCompra();
    });

    

    function validarInsumoCompra() {
        // Obtener el valor seleccionado del campo select
        var InsumoSeleccion = InsumoCompra.value;

        // Restablecer los estilos y mensajes de validación
        InsumoCompra.classList.remove('is-invalid', 'is-valid');
        InsumoFeedback.textContent = '';

        if (InsumoSeleccion === '' ) {
            InsumoCompra.classList.add('is-invalid');
            InsumoFeedback.textContent = 'Por favor, Escoja una opcion.';
            cambiarClaseBotonInusumo();
        } else {
            // El campo es válido
            if (!InsumoCompra.classList.contains('is-invalid') && !CantidadCompra.classList.contains('is-invalid')) {
                restaurarClaseBotonInusumo();
            }
            InsumoCompra.classList.add('is-valid');
        }
    }

    CantidadCompra.addEventListener('input', function () {
        validarCantidadCompra();
    });

    function validarCantidadCompra() {
        // Obtener el valor seleccionado del campo select
        var Cantidad = CantidadCompra.value;

        // Restablecer los estilos y mensajes de validación
        CantidadCompra.classList.remove('is-invalid', 'is-valid');
        CantidadFeedback.textContent = '';

        if (Cantidad.trim() === '' ) {
            CantidadCompra.classList.add('is-invalid');
            CantidadFeedback.textContent = 'Por favor, ingrese la cantidad.';
            cambiarClaseBotonInusumo();
        }
        // Validar longitud del nombre
        else if (Cantidad <= 0) {
            CantidadCompra.classList.add('is-invalid');
            CantidadFeedback.textContent = 'Debe ser mayor a 0';
            cambiarClaseBotonInusumo();
        } else if (Cantidad == '+' || Cantidad == '-' || Cantidad == 'e') {
            CantidadCompra.classList.add('is-invalid');
            CantidadFeedback.textContent = 'No se pueden ingresar caracteres especiales.';
        }
        else {
            // El campo es válido
            if (!InsumoCompra.classList.contains('is-invalid') && !CantidadCompra.classList.contains('is-invalid')) {
                restaurarClaseBotonInusumo();
            }
            CantidadCompra.classList.add('is-valid');
        }
    }

    MedidaCompra.addEventListener('change', function () {
        validarMedidaCompra();
    });

    function validarMedidaCompra() {
        // Obtener el valor seleccionado del campo select
        var MedidaSeleccion = MedidaCompra.value;

        // Restablecer los estilos y mensajes de validación
        MedidaCompra.classList.remove('is-invalid', 'is-valid');
        MedidaFeedback.textContent = '';

        // Validar si no se ha seleccionado ninguna opción
        if (MedidaSeleccion === '') {
            MedidaCompra.classList.add('is-invalid');
            MedidaFeedback.textContent = 'Por favor, elige una opción.';
            cambiarClaseBotonAgregar();
        } else {
            // El campo es válido
            if (!MedidaCompra.classList.contains('is-invalid') && !PrecioCompra.classList.contains('is-invalid')) {
                restaurarClaseBotonAgregar();
            }
            MedidaCompra.classList.add('is-valid');
        }
    }


    PrecioCompra.addEventListener('input', function () {
        validarPrecioCompra();
    });

    function validarPrecioCompra() {
        // Obtener el valor seleccionado del campo select
        var Precio = PrecioCompra.value;

        // Restablecer los estilos y mensajes de validación
        PrecioCompra.classList.remove('is-invalid', 'is-valid');
        PrecioFeedback.textContent = '';

        if (Precio.trim() === '') {
            PrecioCompra.classList.add('is-invalid');
            PrecioFeedback.textContent = 'Por favor, ingrese la precio del insumo';
            cambiarClaseBotonAgregar();
        }
        // Validar longitud del nombre
        else if (Precio < 100) {
            PrecioCompra.classList.add('is-invalid');
            PrecioFeedback.textContent = 'Debe ser mayor a o igual a 100 pesos';
            cambiarClaseBotonAgregar();
        } else if (/[^a-zA-Z0-9\s]/.test(Precio)) {
            PrecioCompra.classList.add('is-invalid');
            PrecioFeedback.textContent = 'No se pueden ingresar caracteres especiales.';
            cambiarClaseBotonAgregar();
        }
        else {
            // El campo es válido
            if (!MedidaCompra.classList.contains('is-invalid') && !PrecioCompra.classList.contains('is-invalid')) {
                restaurarClaseBotonAgregar();
            }
            PrecioCompra.classList.add('is-valid');
        }
    }
    

    
}); // Aquí se agrega el paréntesis de cierre

window.addEventListener('load', function () {
    const cancelarCompraBtn = document.querySelector('.cancelarCompraBtn');

    // Agregar evento de clic al botón
    cancelarCompraBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Evitar que el enlace se siga ejecutando

        // Mostrar la SweetAlert de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción cancelará la compra actual.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, volver'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, redirigir a la función "Delete" en el controlador de compras
                window.location.href = cancelarCompraBtn.getAttribute('href');
            }
        });
    });
});

//function formatearPrecio(input) {
//    // Obtener el valor del input
//    let valor = input.value;

//    // Remover cualquier separador de miles o símbolo de moneda
//    valor = valor.replace(/\D/g, '');

//    // Convertir el valor a número
//    let numero = Number(valor);

//    // Formatear el número con separador de miles y símbolo de moneda
//    let precioFormateado = formatearNumero(numero);

//    // Agregar el símbolo de pesos adelante del precio formateado
//    precioFormateado = '$' + precioFormateado;

//    // Actualizar el valor del input con el precio formateado
//    input.value = precioFormateado;
//}

//function formatearNumero(numero) {
//    // Convertir el número a una cadena
//    let numeroString = numero.toString();

//    // Separar la parte entera de la parte decimal (si existe)
//    let partes = numeroString.split('.');
//    let parteEntera = partes[0];
//    let parteDecimal = partes[1] || '';

//    // Agregar separador de miles
//    let parteEnteraFormateada = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

//    // Unir la parte entera formateada con la parte decimal
//    let numeroFormateado = parteEnteraFormateada + (parteDecimal ? ',' + parteDecimal : '');

//    return numeroFormateado;
//}