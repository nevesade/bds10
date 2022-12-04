import './styles.css';

import Pagination from 'components/Pagination';
import EmployeeCard from 'components/EmployeeCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Employee } from 'types/employee';
import { SpringPage } from 'types/vendor/spring';

/* const employeeHardCode = {
  // delete
  id: 1,
  name: 'Carlos',
  email: 'carlos@gmail.com',
  department: {
    id: 1,
    name: 'Sales',
  },
};
 */
const List = () => {
  const [page, setPage] = useState<SpringPage<Employee>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/employees',
      withCredentials: true,
      params: {
        page: 0,
        size: 4,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
      //console.log(response)
    });
  }, []);

  const handlePageChange = (pageNumber: number) => {
    // to do
  };

  return (
    <>
      <Link to="/admin/employees/create">
        <button className="btn btn-primary text-white btn-crud-add">
          ADICIONAR
        </button>
      </Link>

      {page?.content.map((employee) => (
        <EmployeeCard employee={employee} />
      ))}

      {/*  <EmployeeCard employee={employeeHardCode} />
      <EmployeeCard employee={employeeHardCode} />
      <EmployeeCard employee={employeeHardCode} /> */}

      <Pagination
        forcePage={0}
        pageCount={1}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
