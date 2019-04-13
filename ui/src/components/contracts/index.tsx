import React from 'react'
import { Header, Table, Rating } from 'semantic-ui-react'
import ContractLine from './ContractLine';
import { ContractsReturnType, Contract } from '../../types/Contract';

interface Props {
  contracts: Array<Contract>,
}

enum StateType { Active, Committed, WorkFinished, Cancelled, Approved, Rejected }

class Contracts extends React.Component<Props, any> {
  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Timestamp</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Efficacy</Table.HeaderCell>
            <Table.HeaderCell>Consensus</Table.HeaderCell>
            <Table.HeaderCell>Comments</Table.HeaderCell>
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