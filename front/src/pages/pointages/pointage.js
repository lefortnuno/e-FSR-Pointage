import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";
import Template from "../../components/template/template";
import PointageSortie from "../../components/modals/pointages/sortie";
import { useEffect, useMemo, useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import { Link, useNavigate } from "react-router-dom";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsQrCode,
  BsSearch,
} from "react-icons/bs";
import { formatDate, formatHoursMin } from "../../contexts/dates/formatDate";

const url_req = `pointage/`;

export default function Pointage() {
  const u_info = GetUserData();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataToModif, setDataToModif] = useState(null);

  const handleEditClick = (data) => {
    setDataToModif(data);
    setShowModalEdit(true);
  };

  useEffect(() => {
    fetchData(currentDate);
  }, [currentDate]);

  const fetchData = (date) => {
    setLoading(true);
    axios
      .post(url_req + "byDay/", { dateIwant: date }, u_info.opts)
      .then((response) => {
        if (response.status === 200 && response.data.success) {
          setData(response.data.data);
        } else {
          setData([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setData([]);
        setLoading(false);
      });
  };

  const handlePreviousDay = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() - 1)));
  };

  const handleNextDay = () => {
    setCurrentDate((prev) => new Date(prev.setDate(prev.getDate() + 1)));
  };

  const columns = useMemo(
    () => [
      {
        Header: " ",
        accessor: "pic",
        Cell: ({ value }) => (
          <img
            src={`${process.env.REACT_APP_SUN_COMPLET_URL}${value}`}
            alt="Employee"
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              border: "3px solid black",
              objectFit: "cover",
            }}
          />
        ),
      },
      {
        Header: "Nom",
        accessor: (row) => `${row.nom} ${row.prenom}`,
      },
      {
        Header: "Arrivée",
        accessor: "heureEntree",
        Cell: ({ value }) => formatHoursMin(value),
      },
      {
        Header: "Départ",
        accessor: "heureSortie",
        Cell: ({ value }) => (value ? formatHoursMin(value) : "-"),
      },
      {
        Header: "Commentaire",
        accessor: "coms",
        Cell: ({ value }) => (value ? value : "-"),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-around">
            {row.original.heureSortie === null && (
              <BsQrCode
                className="text-success cursor-pointer"
                onClick={() => handleEditClick(row.original)}
              />
            )}
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Template
      customInput={
        <div className="input-group">
          <span className="input-group-text text-body">
            <BsSearch aria-hidden="true" />
          </span>
          <input
            type="text"
            placeholder="Rechercher ..."
            className="form-control"
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      }
    >
      <div className="date-container-wrapper mt-4 mb-2">
        <span className="me-2 cursor-pointer" onClick={handlePreviousDay}>
          <BsArrowLeftCircleFill />
        </span>
        <span className="date-container" onClick={() => navigate("/absences/")}>
          Fiche de Présence {" - "}
          {currentDate
            .toLocaleDateString("fr-FR", { weekday: "long" })
            .charAt(0)
            .toUpperCase() +
            currentDate
              .toLocaleDateString("fr-FR", { weekday: "long" })
              .slice(1)}{" "}
          {formatDate(currentDate)}
        </span>
        <span className="ms-2 cursor-pointer" onClick={handleNextDay}>
          <BsArrowRightCircleFill />
        </span>
      </div>

      <div className="table-responsive bg-white pt-1 pb-1 ps-4 pe-4 mt-2 border-radius-xl">
        <table className="table table-bordered" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {loading ? (
              <tr>
                <td colSpan="100%" className="text-center">
                  Chargement...
                </td>
              </tr>
            ) : rows.length > 0 ? (
              page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="100%" className="text-center">
                  Aucune donnée trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-secondary"
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            Précédent
          </button>
          <span>
            Page {pageIndex + 1} sur {pageOptions.length}
          </span>
          <button
            className="btn btn-secondary"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            Suivant
          </button>
        </div>
      </div>
      {showModalEdit && (
        <PointageSortie
          userData={dataToModif}
          u_info={u_info}
          onClose={() => setShowModalEdit(false)}
          onSave={fetchData}
        />
      )}
    </Template>
  );
}
