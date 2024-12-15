import axios from "../../contexts/api/axios";
import GetUserData from "../../contexts/api/udata";

import Template from "../../components/template/template";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import { Link, useNavigate } from "react-router-dom";

import {
  BsFillTrashFill,
  BsPencilSquare,
  BsEye,
  BsSearch,
  BsPersonPlusFill,
} from "react-icons/bs";

const url_req = `utilisateur/employee/`;

export default function Employee() {
  const navigate = useNavigate();
  const u_info = GetUserData();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(url_req, u_info.opts)
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

  const columns = useMemo(
    () => [
      {
        Header: "Nom",
        accessor: "nom",
      },
      {
        Header: "Département",
        accessor: "departement",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-around">
            <BsEye
              className="text-success cursor-pointer"
              onClick={() => navigate(`/aboutUser/${row.original.im}`)}
            />
            <BsPencilSquare
              className=" cursor-pointer"
              style={{ color: "blue" }}
              onClick={() => console.log("Edit", row.original)}
            />
            <BsFillTrashFill
              className="text-danger cursor-pointer"
              onClick={() => console.log("Delete", row.original)}
            />
          </div>
        ),
      },
    ],
    [navigate]
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
    state: { pageIndex },
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
            className="form-control  text-dark"
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
      }
    >
      <Link
        to={"/newUser/"}
        className="fixed-plugin"
        title="Nouvel utilisateur"
      >
        <div className="fixed-plugin-button text-white bg-dark position-fixed px-3 py-2">
          <BsPersonPlusFill />
        </div>
      </Link>

      <div className="table-responsive bg-white pt-1 pb-1 ps-4 pe-4 mt-2 border-radius-xl">
        <h5 className="text-center my-3">Liste des Employés</h5>

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

        <div className="d-flex justify-content-between align-items-center mt-3">
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
    </Template>
  );
}
