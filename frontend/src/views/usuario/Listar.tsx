import { useCallback, useEffect, useState, type ChangeEvent, type MouseEvent } from 'react';
import { FaPlus, FaCheckCircle, FaRegTrashAlt, FaExclamationCircle } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import PaginationFooter from '../../components/pagination/PaginationFooter';
import SearchBar from '../../components/search/SearchBar';
import { ROTA } from '../../services/router/url';
import { apiGetUsuarios, type SearchParams } from '../../services/usuario/api/api.usuario';
import type { Usuario } from '../../services/usuario/type/Usuario';

export default function ListarUsuario() {
  const [models, setModels] = useState<Usuario[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordPerPages, setRecordPerPages] = useState<number>(5);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [props, setProps] = useState<string>('firstName');
  const [order, setOrder] = useState<string>('ASC');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const buscarTodosUsuarios = useCallback(
    async (params: SearchParams): Promise<any | null> => {
      try {
        const response = await apiGetUsuarios(params);
        return response.data;
      } catch (error: any) {
        console.log(error);
      }
      return null;
    },
    [],
  );

  useEffect(() => {
    async function getUsuarios() {
      const params = {
        page: currentPage,
        pageSize: pageSize,
        props: props,
        order: order,
        searchTerm: searchTerm === '' ? null : searchTerm,
      };
      const data = await buscarTodosUsuarios(params);
      if (data && data.dados) {
        const { content, page, pageSize, totalElements, totalPages } = data.dados;
        setModels(content);
        setCurrentPage(page);
        setPageSize(pageSize);
        setTotalElements(totalElements);
        setTotalPages(totalPages);
      }
    }
    
    // Debounce da pesquisa para não congelar e agredir o back-end
    const delayDebounceFn = setTimeout(() => {
        getUsuarios();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, pageSize, searchTerm, order, props, buscarTodosUsuarios]);

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>Lista de Usuários</h2>
          <Link to={ROTA.USUARIO.CRIAR} className="btn btn-add">
            <span className="btn-icon">
              <i>
                <FaPlus />
              </i>
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
              <th>
                <button onClick={(e) => onSortProps(e, 'firstName')}>Nome Completo</button>
              </th>
              <th>
                <button onClick={(e) => onSortProps(e, 'username')}>Username</button>
              </th>
              <th>
                <button onClick={(e) => onSortProps(e, 'email')}>Email de Contato</button>
              </th>
              <th className="center">Status</th>
              <th className="center">Ação</th>
            </tr>
          </thead>
          <tbody>
            {models?.map((model, index) => (
              <tr key={model.idUsuario || index}>
                <td><strong>{model.nomeCompleto}</strong></td>
                <td>{model.username}</td>
                <td>{model.email}</td>
                <td className="center" style={{color: model.statusValidacao ? '#10b981' : '#f59e0b'}}>
                   {model.statusValidacao ? (
                     <><FaCheckCircle /> Verificado</>
                   ) : (
                     <><FaExclamationCircle /> Pendente</>
                   )}
                </td>
                <td className="center actions">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`${ROTA.USUARIO.ATUALIZAR}/${model.idUsuario}`} className="btn-minimal text-primary" title="Editar">
                      <BsPencilSquare size={18} />
                    </Link>
                    <Link to={`${ROTA.USUARIO.EXCLUIR}/${model.idUsuario}`} className="btn-minimal text-danger" title="Excluir">
                      <FaRegTrashAlt size={18} />
                    </Link>
                    <Link to={`${ROTA.USUARIO.POR_ID}/${model.idUsuario}`} className="btn-minimal text-info" title="Visualizar">
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
