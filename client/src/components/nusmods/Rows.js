import React from 'react';
import { Table } from 'semantic-ui-react';
import RowItem from './RowItem';

const Rows = ({modules, day}) => {
    return (
        <Table.Row>
            <Table.Cell>{day}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "0800" || module.endTime === "0900" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "0900" || module.endTime === "1000" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "1000" || module.endTime === "1100" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "1100" || module.endTime === "1200" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "1200" || module.endTime === "1300" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "1300" || module.endTime === "1400" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "1400" || module.endTime === "1500" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "1500" || module.endTime === "1600" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "1600" || module.endTime === "1700" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.startTime === "1700" || module.endTime === "1800" ? <RowItem module={module} key={module._id}/> : "")}</Table.Cell>
        </Table.Row>
    )
}

export default Rows;