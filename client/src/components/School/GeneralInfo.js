import React from "react";
import {CardBody, Table} from "reactstrap";


export const GeneralInfo = props => {
    let data = props.data; 

    const determineLocale = () => {
        let locale;
        switch (data.school.locale) {
            case 11 || 12 || 13 : locale = "City"; break;
            case 21 || 22 || 23 : locale = "Suburb"; break;
            case 31 || 32 || 33 : locale = "Town"; break;
            case 41 || 42 || 43 : locale = "Rural"; break;
            default: locale = null;
        }
        return locale;
    }

    const determineSize = () => {
        let size;
        switch(data.school.carnegie_size_setting) {
            case 1 : size = "two-year, very small"; break;
            case 2 : size = "two-year, small"; break;
            case 3 : size = "two-year, medium"; break;
            case 4 : size = "two-year, large"; break;
            case 5 : size = "two-year, very large"; break;
            case 6 : size = "four-year, very small, primarily nonresidential"; break;
            case 7 : size = "four-year, very small, primarily residential"; break;
            case 8 : size = "four-year, very small, highly residential"; break;
            case 9 : size = "four-year, small, primarily nonresidential"; break;
            case 10 : size = "four-year, small, primarily residential"; break;
            case 11	: size = "four-year, small, highly residential"; break;
            case 12	: size = "four-year, medium, primarily nonresidential"; break;
            case 13	: size = "four-year, medium, primarily residential"; break;
            case 14	: size = "four-year, medium, highly residential"; break;
            case 15	: size = "four-year, large, primarily nonresidential"; break;
            case 16	: size = "four-year, large, primarily residential"; break;
            case 17	: size = "four-year, large, highly residential"; break;
            case 18	: size = "exclusively graduate/professional"; break;
            default : size = "";
        }
        return size;
    }

    return ( 
        <CardBody>
            <h4 className="school-sub-header">Overview</h4>
            <a href={"http://" + data.school.school_url} target="_blank" rel="noopener noreferrer">{data.school.school_url}</a>
            <p>{data.school.name} is&nbsp;
                {(data.school.carnegie_size_setting 
                && data.school.carnegie_size_setting > 0 
                && data.school.carnegie_size_setting < 19)
                ?
                <span>a {determineSize()} school </span>
                : 
                "" }
                located in {data.school.city}, {data.school.state}.
            </p>
            <h4>Statistics</h4>
            <Table>
                <tbody>
                    <tr>
                        <th width="250px">Location</th>
                        <td>{data.school.city}, {data.school.state}</td>
                    </tr>
                    
                    {determineLocale() 
                        ? 
                            <tr>
                                <th>Locale</th>
                                <td>{determineLocale()}</td>
                            </tr>
                        : 
                            <div></div>
                    }
                    
                    {/* If 2015 data doesn't exist for this field, try 2014, then 2013 */}
                    { data["2015"].student.size 
                        ? <tr><th>Undergraduate population (2015)</th><td>{data["2015"].student.size}</td></tr>
                        : data["2014"].student.size 
                            ? <tr><th>Undergraduate population (2014)</th><td>{data["2014"].student.size}</td></tr>
                            : data["2013"].student.size 
                                ? <tr><th>Undergraduate population (2013)</th><td>{data["2013"].student.size}</td></tr> 
                                : <div></div>
                    }

                    {/* If 2015 data doesn't exist for this field, try 2014, then 2013 */}
                    { data["2015"].student.grad_students 
                        ? <tr><th>Graduate population (2015)</th><td>{data["2015"].student.grad_students} </td></tr>
                        : data["2014"].student.grad_students  
                            ? <tr><th>Graduate population (2014)</th><td>{data["2014"].student.grad_students } </td></tr>
                            : data["2013"].student.grad_students  
                                ? <tr><th>Graduate population (2013)</th><td>{data["2013"].student.grad_students} </td></tr> 
                                : <div></div>
                    }

                    {/* If 2015 data doesn't exist for this field, try 2014, then 2013 */}
                    { data["2015"].admissions.admission_rate 
                        ? <tr><th>Admissions rate (2015)</th><td>{(data["2015"].admissions.admission_rate.overall*100).toFixed(2)}%</td></tr>
                        : data["2014"].admissions.admission_rate
                            ? <tr><th>Admissions rate (2014)</th><td>{(data["2014"].admissions.admission_rate.overall*100).toFixed(2)}% </td></tr>
                            : data["2013"].admissions.admission_rate 
                                ? <tr><th>Admissions rate (2013)</th><td>{(data["2013"].admissions.admission_rate.overall*100).toFixed(2)}% </td></tr> 
                                : <div></div>
                    }

                </tbody>
            </Table>
        </CardBody>
    )
    
}