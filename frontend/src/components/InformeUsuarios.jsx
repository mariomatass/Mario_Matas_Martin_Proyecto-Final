import MaterialTable from "@material-table/core"
import { ExportCsv, ExportPdf } from "@material-table/exporters"

function InformeUsuarios(props){
    const cols = [{ title: "Nombre", field: "nombre" }, { title: "Login", field: "login", filtering: false }, { title: "Contraseña", field: "password", filtering: false }, { title: "Rol", field: "rol", filtering: false }]
    const tabla = props.datos
    return<>
        <MaterialTable
            columns={cols} data={tabla}
            title="Información de usuarios"
            options={{
                draggable: true,
                columnsButton: true,
                filtering: true,
                headerStyle: {
                    backgroundColor: "#b2ffc3",
                    color: "rgba(70,69,69,0.87)",
                  },
                exportMenu: [
                    {
                        label: "Exportar a PDF",
                        exportFunc: (cols, tabla) => ExportPdf(cols, tabla, "UsuariosPDF"),
                    },
                    {
                        label: "Exportar a CSV",
                        exportFunc: (cols, tabla) => ExportCsv(cols, tabla, "UsuariosCSV")
                    }
                ],
            }}
        />
    </>
}
export default InformeUsuarios