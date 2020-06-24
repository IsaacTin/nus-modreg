import React from 'react';
import { Table } from 'semantic-ui-react';
import RowItem from './RowItem';

const Rows = ({modules, day}) => {
    return (
        <Table.Row>
            <Table.Cell>{day}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "0800" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "0900" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "0900" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1000" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "1000" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1100" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "1100" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1200" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "1200" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1300" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "1300" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1400" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "1400" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1500" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "1500" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1600" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "1600" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1700" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
            <Table.Cell>{modules.map((module) => module.timing.filter((time) => time.startTime === "1700" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1800" && time.day === day).length !== 0 ? <RowItem module={module} timing={module.timing.filter((time) => time.day === day)}key={module.classNo}/> : "")}</Table.Cell>
        </Table.Row>
    )
}

export default Rows;