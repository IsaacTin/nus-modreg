import React from 'react';
import { Table } from 'semantic-ui-react';
import RowItem from './RowItem';
import EmptySlot from './EmptySlot';

const Rows = ({modules, day}) => {
    let present1 = false;
    let present2 = false;
    let present3 = false;
    let present4 = false;
    let present5 = false;
    let present6 = false;
    let present7 = false;
    let present8 = false;
    let present9 = false;
    let present10 = false;
    return (
        <Table.Row>
            <Table.Cell>{day}</Table.Cell>
            {modules.map((module) => module.timing.filter((time) => time.startTime === "0800" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "0900" && time.day === day).length !== 0 ? present1 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present1 ? "" : <EmptySlot startTime={"0800"} endTime={"0900"}/>}
            {modules.map((module) => module.timing.filter((time) => time.startTime === "0900" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1000" && time.day === day).length !== 0 ? present2 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present2 ? "" : <EmptySlot startTime={"0900"} endTime={"1000"}/>}
            {modules.map((module) => module.timing.filter((time) => time.startTime === "1000" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1100" && time.day === day).length !== 0 ? present3 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present3 ? "" : <EmptySlot startTime={"1000"} endTime={"1100"}/>}
            {modules.map((module) => module.timing.filter((time) => time.startTime === "1100" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1200" && time.day === day).length !== 0 ? present4 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present4 ? "" : <EmptySlot startTime={"1100"} endTime={"1200"}/>}
            {modules.map((module) => module.timing.filter((time) => time.startTime === "1200" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1300" && time.day === day).length !== 0 ? present5 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present5 ? "" : <EmptySlot startTime={"1200"} endTime={"1300"}/>}
            {modules.map((module) => module.timing.filter((time) => time.startTime === "1300" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1400" && time.day === day).length !== 0 ? present6 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present6 ? "" : <EmptySlot startTime={"1300"} endTime={"1400"}/>}
            {modules.map((module) => module.timing.filter((time) => time.startTime === "1400" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1500" && time.day === day).length !== 0 ? present7 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present7 ? "" : <EmptySlot startTime={"1400"} endTime={"1500"}/>}
            {modules.map((module) => module.timing.filter((time) => time.startTime === "1500" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1600" && time.day === day).length !== 0 ? present8 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present8 ? "" : <EmptySlot startTime={"1500"} endTime={"1600"}/>}
            {modules.map((module) => module.timing.filter((time) => time.startTime === "1600" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1700" && time.day === day).length !== 0 ? present9 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present9 ? "" : <EmptySlot startTime={"1600"} endTime={"1700"}/>}
            {modules.map((module) => module.timing.filter((time) => time.startTime === "1700" && time.day === day).length !== 0 || module.timing.filter((time) => time.endTime === "1800" && time.day === day).length !== 0 ? present10 = true && <RowItem module={module} day={day} key={module.classNo} /> : "")}{present10 ? "" : <EmptySlot startTime={"1700"} endTime={"1800"}/>}
        </Table.Row>
    )
}

export default Rows;