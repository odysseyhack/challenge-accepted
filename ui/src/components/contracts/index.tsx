import React from 'react'
import { Header, Table, Rating } from 'semantic-ui-react'
import ContractLine from './ContractLine';
import { ContractsReturnType, Contract } from '../../types/Contract';

interface Props {
  contracts: Array<Contract>,
}

class Contracts extends React.Component<Props, any> {
  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Timestamp</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Hash</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            this.props.contracts ? this.props.contracts.map((contract: any, i: number) => (
              <ContractLine {...contract} key={i} />
            )) : null
          }

        </Table.Body>
      </Table>
    )
  }
}

export default Contracts