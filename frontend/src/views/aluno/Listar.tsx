import { useCallback, useEffect, useState, type ChangeEvent, type MouseEvent } from 'react';
import { FaPlus, FaRegTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import PaginationFooter from '../../components/pagination/PaginationFooter';
import SearchBar from '../../components/search/SearchBar';
import { ROTA } from '../../services/router/url';
import { apiGetAlunos, type SearchParams } from '../../services/aluno/api/api.aluno';
import type { Aluno } from '../../services/aluno/type/Aluno';

export default function ListarAluno() {
  const [models, setModels] = useState<Aluno[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordPerPages, setRecordPerPages] = useState<number>(5);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [props, setProps] = useState<string>('nomeAluno');
  const [order, setOrder] = useState<string>('ASC');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const buscarTodosAlunos = useCallback(
    async (params: SearchParams): Promise<any | null> => {
      try {
        const response = await apiGetAlunos(params);
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
      return null;
    },
    [],
  );

  useEffect(() => {
    async function loadAlunos() {
      const params = {
        page: currentPage,
        pageSize: pageSize,
        props: props,
        order: order,
        searchTerm: searchTerm === '' ? null : searchTerm,
      };
      const data = await buscarTodosAlunos(params);
      if (data && data.dados) {
        const { content, page, pageSize, totalElements, totalPages } = data.dados;
        setModels(content);
        setCurrentPage(page);
        setPageSize(pageSize);
        setTotalElements(totalElements);
        setTotalPages(totalPages);
      }
    }
    
    const delayDebounceFn = setTimeout(() => {
        loadAlunos();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, pageSize, searchTerm, order, props, buscarTodosAlunos]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(Number(pageNumber));
  };

  const handleRecordsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setRecordPerPages(Number(e.target.value));
    setCurrentPage(1);
  };

  const onSortProps = (e: MouseEvent<HTMLButtonElement>, propBase: string) => {
    e.preventDefault();
    const dir = order && order === 'ASC' ? 'DESC' : 'ASC';
    setProps(propBase);
    setOrder(dir);
  };

  return (
    <div className="display">
      <div className="card animated fadeInDown">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Lista de Alunos</h2>
          <Link to={ROTA.ALUNO.CRIAR} className="btn btn-add">
            <span className="btn-icon">
              <i><FaPlus /></i>
            </span>
            Nova Adição
          </Link>
        </div>
        
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          recordsPerPage={recordPerPages}
          handleRecordsPerPageChange={handleRecordsPerPageChange}
        />
        
        <table>
          <thead>
            <tr>
              <th><button onClick={(e) => onSortProps(e, 'codAluno')}>Código</button></th>
              <th><button onClick={(e) => onSortProps(e, 'nomeAluno')}>Nome</button></th>
              <th><button onClick={(e) => onSortProps(e, 'idade')}>Idade</button></th>
              <th>Usuário Vinculado</th>
              <th className="center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {models?.map((model, index) => (
              <tr key={model.idAluno || index}>
                <td>{model.codAluno}</td>
                <td><strong>{model.nomeAluno}</strong></td>
                <td>{model.idade}</td>
                <td>{model.usuario?.nomeCompleto || '-'}</td>
                <td className="center actions">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`${ROTA.ALUNO.ATUALIZAR}/${model.idAluno}`} className="btn-minimal text-primary" title="Editar">
                      <BsPencilSquare size={18} />
                    </Link>
                    <Link to={`${ROTA.ALUNO.EXCLUIR}/${model.idAluno}`} className="btn-minimal text-danger" title="Excluir">
                      <FaRegTrashAlt size={18} />
                    </Link>
                    <Link to={`${ROTA.ALUNO.POR_ID}/${model.idAluno}`} className="btn-minimal text-info" title="Visualizar">
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
