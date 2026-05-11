import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import PaginationFooter from '../../components/pagination/PaginationFooter';
import SearchBar from '../../components/search/SearchBar';
import { apiGetDisciplinas, type SearchParams } from '../../services/disciplina/api/api.disciplina';
import { DISCIPLINA } from '../../services/disciplina/constants/disciplina.constants';
import type { Disciplina } from '../../services/disciplina/type/Disciplina';
import { ROTA } from '../../services/router/url';

export default function ListarDisciplina() {
  const [models, setModels] = useState<Disciplina[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordPerPages, setRecordPerPages] = useState<number>(5);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [props, setProps] = useState<string>('NOME_DISCIPLINA');
  const [order, setOrder] = useState<string>('ASC');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const buscarTodasDisciplinas = useCallback(
    async (params: SearchParams): Promise<any | null> => {
      try {
        const response = await apiGetDisciplinas(params);
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
      return null;
    },
    [],
  );

  useEffect(() => {
    async function getDisciplinas() {
      const params = {
        page: currentPage,
        pageSize: pageSize,
        props: props,
        order: order,
        searchTerm: searchTerm === '' ? null : searchTerm,
      };
      const data = await buscarTodasDisciplinas(params);
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
      getDisciplinas();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, pageSize, searchTerm, order, props, buscarTodasDisciplinas]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(Number(pageNumber));
  };

  const handleRecordsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setRecordPerPages(Number(e.target.value));
    setCurrentPage(1);
  };

  const onSortProps = (e: MouseEvent<HTMLButtonElement>, sortProps: string) => {
    e.preventDefault();
    const dir = props === sortProps && order === 'ASC' ? 'DESC' : 'ASC';
    setProps(sortProps);
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
          <h2>{DISCIPLINA.TITULO.LISTA}</h2>
          <Link to={ROTA.DISCIPLINA.CRIAR} className="btn btn-add">
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
                <button onClick={(e) => onSortProps(e, 'ID_DISCIPLINA')}>
                  {DISCIPLINA.LABEL.ID}
                </button>
              </th>
              <th>
                <button onClick={(e) => onSortProps(e, 'NOME_DISCIPLINA')}>
                  {DISCIPLINA.LABEL.NOME}
                </button>
              </th>
              <th>
                <button onClick={(e) => onSortProps(e, 'PERIODO')}>
                  {DISCIPLINA.LABEL.PERIODO}
                </button>
              </th>
              <th>
                <button onClick={(e) => onSortProps(e, 'NOME_PROFESSOR')}>
                  {DISCIPLINA.LABEL.PROFESSOR}
                </button>
              </th>
              <th className="center actions">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {models?.map((model) => (
              <tr key={model.idDisciplina}>
                <td>{model.idDisciplina}</td>
                <td>{model.nomeDisciplina}</td>
                <td>{model.periodo}º</td>
                <td>{model.professor?.nomeProfessor || 'N/A'}</td>
                <td className="center actions">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`${ROTA.DISCIPLINA.ATUALIZAR}/${model.idDisciplina}`} className="btn-minimal text-primary" title="Editar">
                      <BsPencilSquare size={18} />
                    </Link>
                    <Link to={`${ROTA.DISCIPLINA.EXCLUIR}/${model.idDisciplina}`} className="btn-minimal text-danger" title="Excluir">
                      <FaRegTrashAlt size={18} />
                    </Link>
                    <Link to={`${ROTA.DISCIPLINA.POR_ID}/${model.idDisciplina}`} className="btn-minimal text-info" title="Visualizar">
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
