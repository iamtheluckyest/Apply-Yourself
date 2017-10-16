import React from "react";
import {CardBody, Table} from "reactstrap";


export const GeneralInfo = props => {
    let data = props.data; 

    // Parses locale from College Scorecard API
    const determineLocale = () => {
        let locale;
        switch (data.school.locale) {
            case 11: case 12: case 13 : locale = "City"; break;
            case 21: case 22: case 23 : locale = "Suburb"; break;
            case 31: case 32: case 33 : locale = "Town"; break;
            case 41: case 42: case 43 : locale = "Rural"; break;
            default: locale = null;
        }
        return locale;
    }

    // Parses carnegie_size_setting from College Scorecard API
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

    const determineRegAffiliation = () => {
        let faith;
        switch(data.school.religious_affiliation) {
            case 22 : faith = "the American Evangelical Lutheran Church"; break;
            case 24 : faith = "the African Methodist Episcopal Zion Church"; break;
            case 27 : faith = "the Assemblies of God Church"; break;
            case 28 : faith = "the Brethren Church"; break;
            case 30 : faith = "the Roman Catholic"; break;
            case 33 : faith = "the Wisconsin Evangelical Lutheran Synod"; break;
            case 34 : faith = "the Christ and Missionary Alliance Church"; break;
            case 35 : faith = "the Christian Reformed Church"; break;
            case 36 : faith = "the Evangelical Congregational Church"; break;
            case 37 : faith = "the Evangelical Covenant Church of America"; break;
            case 38 : faith = "the Evangelical Free Church of America"; break;
            case 39 : faith = "the Evangelical Lutheran Church"; break;
            case 40 : faith = "the International United Pentecostal Church"; break;
            case 41 : faith = "the Free Will Baptist Church"; break;
            case 42 : faith = "the Interdenominational"; break;
            case 43 : faith = "the Mennonite Brethren Church"; break;
            case 44 : faith = "the Moravian Church"; break;
            case 45 : faith = "the North American Baptist"; break;
            case 47 : faith = "the Pentecostal Holiness Church"; break;
            case 48 : faith = "the Christian Churches and Churches of Christ"; break;
            case 49 : faith = "the Reformed Church in America"; break;
            case 50 : faith = "the Episcopal Church, Reformed"; break;
            case 51 : faith = "the African Methodist Episcopal"; break;
            case 52 : faith = "the American Baptist"; break;
            case 53 : faith = "the American Lutheran"; break;
            case 54 : faith = "the Baptist"; break;
            case 55 : faith = "the Christian Methodist Episcopal"; break;
            case 57 : faith = "the Church of God"; break;
            case 58 : faith = "the Church of Brethren"; break;
            case 59 : faith = "the Church of the Nazarene"; break;
            case 60 : faith = "the Cumberland Presbyterian"; break;
            case 61 : faith = "the Christian Church (Disciples of Christ)"; break;
            case 64 : faith = "the Free Methodist"; break;
            case 65 : faith = "the Friends"; break;
            case 66 : faith = "the Presbyterian Church (USA)"; break;
            case 67 : faith = "the Lutheran Church in America"; break;
            case 68 : faith = "the Lutheran Church - Missouri Synod"; break;
            case 69 : faith = "the Mennonite Church"; break;
            case 71 : faith = "the United Methodist"; break;
            case 73 : faith = "the Protestant Episcopal"; break;
            case 74 : faith = "the Churches of Christ"; break;
            case 75 : faith = "the Southern Baptist"; break;
            case 76 : faith = "the United Church of Christ"; break;
            case 77 : faith = "the Protestant, not specified"; break;
            case 78 : faith = "the Multiple Protestant Denomination"; break;
            case 79 : faith = "a Protestant"; break;
            case 80 : faith = "the Jewish"; break;
            case 81 : faith = "the Reformed Presbyterian Church"; break;
            case 84 : faith = "the United Brethren Church"; break;
            case 87 : faith = "the Missionary Church Inc"; break;
            case 88 : faith = "an Undenominational"; break;
            case 89 : faith = "the Wesleyan"; break;
            case 91 : faith = "the Greek Orthodox"; break;
            case 92 : faith = "the Russian Orthodox"; break;
            case 93 : faith = "the Unitarian Universalist"; break;
            case 94 : faith = "the Latter Day Saints (Mormon Church)"; break;
            case 95 : faith = "the Seventh Day Adventists"; break;
            case 97 : faith = "The Presbyterian Church in America"; break;
            case 100 : faith = "the Original Free Will Baptist"; break;
            case 101 : faith = "the Ecumenical Christian"; break;
            case 102 : faith = "the Evangelical Christian"; break;
            case 103 : faith = "the Presbyterian"; break;
            default : faith = "no particular";
        }
        return faith;
    }

    const determineSingleGender = () => {
        let gender = "co-ed";
        if (data.school.men_only === 1) {
            gender = "men-only"
        } else if (data.school.women_only === 1) {
            gender = "women-only"
        }
        return gender;
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
                located in {data.school.city}, {data.school.state}. It is a {determineSingleGender()} institution, affiliated with {determineRegAffiliation()} faith.
            </p>
            <h4>General</h4>
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
                        ? <tr><th>Undergraduate population</th><td>{data["2015"].student.size}</td></tr>
                        : data["2014"].student.size 
                            ? <tr><th>Undergraduate population (2014)</th><td>{data["2014"].student.size}</td></tr>
                            : data["2013"].student.size 
                                ? <tr><th>Undergraduate population (2013)</th><td>{data["2013"].student.size}</td></tr> 
                                : <div></div>
                    }

                    {/* If 2015 data doesn't exist for this field, try 2014, then 2013 */}
                    { data["2015"].student.grad_students 
                        ? <tr><th>Graduate population</th><td>{data["2015"].student.grad_students} </td></tr>
                        : data["2014"].student.grad_students  
                            ? <tr><th>Graduate population (2014)</th><td>{data["2014"].student.grad_students } </td></tr>
                            : data["2013"].student.grad_students  
                                ? <tr><th>Graduate population (2013)</th><td>{data["2013"].student.grad_students} </td></tr> 
                                : <div></div>
                    }

                    {/* If 2015 data doesn't exist for this field, try 2014, then 2013 */}
                    { data["2015"].admissions.admission_rate.overall
                        ? <tr><th>Admissions rate</th><td>{(data["2015"].admissions.admission_rate.overall*100).toFixed(2)}%</td></tr>
                        : data["2014"].admissions.admission_rate.overall
                            ? <tr><th>Admissions rate (2014)</th><td>{(data["2014"].admissions.admission_rate.overall*100).toFixed(2)}% </td></tr>
                            : data["2013"].admissions.admission_rate.overall
                                ? <tr><th>Admissions rate (2013)</th><td>{(data["2013"].admissions.admission_rate.overall*100).toFixed(2)}% </td></tr> 
                                : <div></div>
                    }
                </tbody>
            </Table>
            <h4>Aid</h4>
            <Table>
                <tbody>
                    {/* If 2015 data doesn't exist for this field, try 2014, then 2013 */}
                    { data["2015"].aid.students_with_any_loan
                        ? <tr><th width="250px" title="Share of students who received a federal loan while in school">% students with loans</th><td>{(data["2015"].aid.students_with_any_loan*100).toFixed(2)}%</td></tr>
                        : data["2014"].aid.students_with_any_loan
                            ? <tr><th width="250px" title="Share of students who received a federal loan while in school">% students with loans (2014)</th><td>{(data["2014"].aid.students_with_any_loan*100).toFixed(2)}%</td></tr>
                            : data["2013"].aid.students_with_any_loan
                                ? <tr><th width="250px" title="Share of students who received a federal loan while in school">% students with loans (2013)</th><td>{(data["2013"].aid.students_with_any_loan*100).toFixed(2)}% </td></tr> 
                                : <div></div>
                    }

                    {/* If 2015 data doesn't exist for this field, try 2014, then 2013 */}
                    { data["2015"].aid.median_debt.completers.overall
                        ? <tr><th width="250px" title="The median debt for students who have completed">Median debt</th><td>${data["2015"].aid.median_debt.completers.overall}</td></tr>
                        : data["2014"].aid.median_debt.completers.overall
                            ? <tr><th width="250px" title="The median debt for students who have completed">Median debt (2014)</th><td>${data["2014"].aid.median_debt.completers.overall}</td></tr>
                            : data["2013"].aid.median_debt.completers.overall
                                ? <tr><th width="250px" title="The median debt for students who have completed">Median debt (2013)</th><td>${data["2013"].aid.median_debt.completers.overall} </td></tr> 
                                : <div></div>
                    }

                    {/* If 2015 data doesn't exist for this field, try 2014, then 2013 */}
                    { data["2015"].aid.loan_principal
                        ? <tr><th width="250px" title="The median original amount of the loan principal upon entering repayment">Loan principal</th><td>${data["2015"].aid.loan_principal}</td></tr>
                        : data["2014"].aid.loan_principal
                            ? <tr><th width="250px" title="The median original amount of the loan principal upon entering repayment">Loan principal (2014)</th><td>${data["2014"].aid.loan_principal}</td></tr>
                            : data["2013"].aid.loan_principal
                                ? <tr><th width="250px" title="The median original amount of the loan principal upon entering repayment">Loan principal (2013)</th><td>${data["2013"].aid.loan_principal} </td></tr> 
                                : <div></div>
                    }

                </tbody>
            </Table>
        </CardBody>
    )
    
}