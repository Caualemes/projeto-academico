import { useCallback, useEffect, useState, type ChangeEvent, type MouseEvent } from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import PaginationFooter from '../../components/pagination/PaginationFooter';
import SearchBar from '../../components/search/SearchBar';
import { apiGetProfessor, type SearchParams } from '../../services/professor/api/api.professor';
import { PROFESSOR } from '../../services/professor/constants/professor.constants';
import type { Professor } from '../../services/professor/type/Professor';
import { ROTA } from '../../services/router/url';

export default function ListarProfessor() {
  const [models, setModels] = useState<Professor[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordPerPages, setRecordPerPages] = useState<number>(5);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [props, setProps] = useState<string>('NOME_PROFESSOR');
  const [order, setOrder] = useState<string>('ASC');
  const [searchTerm, setSearchTerm] = useState<string>('');


  const buscarTodosProfessores = useCallback(
    async (params: SearchParams): Promise<any | null> => {
      try {
        const response = await apiGetProfessor(params);
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
      return null;
    },
    [],
  );

  useEffect(() => {
    async function getProfessores() {
      const params = {
        page: currentPage,
        pageSize: pageSize,
        props: props,
        order: order,
        searchTerm: searchTerm === '' ? null : searchTerm,
      };
      const data = await buscarTodosProfessores(params);
      if (data) {
        const { content, page, pageSize: size, totalElements: total, totalPages: pages } = data.dados;
        setModels(content);
        setCurrentPage(page);
        setPageSize(size);
        setTotalElements(total);
        setTotalPages(pages);
      }
    }
    const delayDebounceFn = setTimeout(() => {
      getProfessores();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, pageSize, searchTerm, order, props, buscarTodosProfessores]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(Number(pageNumber));
  };

  const handleRecordsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setRecordPerPages(Number(e.target.value));
    setCurrentPage(1);
  };

  const onSortProps = (e: MouseEvent<HTMLButtonElement>, propsField: string) => {
    e.preventDefault();
    const dir = order && order === 'ASC' ? 'DESC' : 'ASC';
    setProps(propsField);
    setOrder(dir);
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>{PROFESSOR.TITULO.LISTA}</h2>
          <Link to={`${ROTA.PROFESSOR.CRIAR}`} className="btn btn-add">
            <span className="btn-icon">
              <i>
                <FaPlus />
              </i>
            </span>
            Novo
          </Link>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          recordsPerPage={recordPerPages}
          handleRecordsPerPageChange={handleRecordsPerPageChange}
        />
        <br />
        <table>
          <thead>
            <tr>
              <th>
                <button onClick={(e) => onSortProps(e, 'COD_PROFESSOR')}>
                  {PROFESSOR.LABEL.CODIGO}
                </button>
              </th>
              <th>
                <button onClick={(e) => onSortProps(e, 'NOME_PROFESSOR')}>
                  {PROFESSOR.LABEL.NOME}
                </button>
              </th>
              <th>
                <button onClick={(e) => onSortProps(e, 'ID_USUARIO')}>
                  {PROFESSOR.LABEL.USUARIO}
                </button>
              </th>
              <th className="center actions">Ação</th>
            </tr>
          </thead>
          <tbody>
            {models?.map((model) => (
              <tr key={model.idProfessor}>
                <td>{model.codProfessor}</td>
                <td>{model.nomeProfessor}</td>
                <td>{model.usuarioNome || model.idUsuario}</td>
                <td className="center actions">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`${ROTA.PROFESSOR.ATUALIZAR}/${model.idProfessor}`} className="btn-minimal text-primary" title="Editar">
                      <BsPencilSquare size={18} />
                    </Link>
                    <Link to={`${ROTA.PROFESSOR.EXCLUIR}/${model.idProfessor}`} className="btn-minimal text-danger" title="Excluir">
                      <FaRegTrashAlt size={18} />
                    </Link>
                    <Link to={`${ROTA.PROFESSOR.POR_ID}/${model.idProfessor}`} className="btn-minimal text-info" title="Visualizar">
                      <FaMagnifyingGlass size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PaginationFooter
          currentPage={currentPage}
          pageSize={pageSize}
          totalElements={totalElements}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
