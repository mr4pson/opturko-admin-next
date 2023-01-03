import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { memo } from 'react';
import styled from 'styled-components';
import Loading from '../Loading';
import { TDataGridCol, TRender } from './types';

type Props = {
  dataSource: Array<any>;
  columns: Array<TDataGridCol<any>>;
  loading?: boolean;
  actions?: TRender<any>;
};
const DataGrid: React.FC<Props> = ({
  loading = false,
  dataSource = [],
  columns = [],
  actions,
}) => {
  return !loading ? (
    <DataGridWrapper>
      <DataGrodTable>
        <MDBTableHead light>
          <tr>
            {columns.map((col, index) => (
              <th key={`table-th-${index}`} scope="col">
                {col.title}
              </th>
            ))}
            {!!actions && <th scope="col"></th>}
          </tr>
        </MDBTableHead>
        <MDBTableBody
          style={{
            position: 'relative',
          }}
        >
          {dataSource.map((item, index) => (
            <tr key={`table-line-${index}`}>
              {columns.map((col, index) => (
                <th key={`table-td-${index}`} scope="row">
                  {col.render ? col.render(item) : item[col.field]}
                </th>
              ))}
              {!!actions && (
                <th>
                  <ActionsWrapper>{actions(item)}</ActionsWrapper>
                </th>
              )}
            </tr>
          ))}
          {!dataSource.length && (
            <NoDataRow>
              <NoDataCell>Нет данных</NoDataCell>
            </NoDataRow>
          )}
        </MDBTableBody>
      </DataGrodTable>
    </DataGridWrapper>
  ) : (
    <Loading />
  );
};

const DataGrodTable = styled(MDBTable)`
  th {
    text-align: center;
  }
`;

const DataGridWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
`;

const NoDataRow = styled.tr`
  display: table-row;
  height: 100px;
  padding: 25px 0;
`;

const NoDataCell = styled.td`
  position: absolute;
  bottom: 10px;
  left: calc(50% - 27px);
  border: none;
`;

export default memo(DataGrid);
