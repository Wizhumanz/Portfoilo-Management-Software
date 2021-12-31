import { propertyInflation, updatePropertyInflation } from "../../redux/features/property";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef, Fragment } from "react";
import { useParams } from "react-router-dom";

const InflationProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loginAuth);
  const { id } = useParams();
  const { inflations } = useSelector((state) => state.property);
  const [propertyInflations, setPropertyInflations] = useState(inflations);

  useEffect(() => {
    if (!inflations) {
      dispatch(propertyInflation({ user, propertyId: id }));
    } else {
      setPropertyInflations(inflations);
    }
  }, [inflations]);

  const addNewInflation = (inflationYears) => {
    let holdingYears = [];
    for (let i = 1; i <= inflationYears; i++) {
      holdingYears.push({
        year: i,
        inflationPercentage: 0,
      });
    }
    setPropertyInflations((propertyInflations) => [
      ...propertyInflations,
      {
        inflationType: "",
        holdingYears: holdingYears,
      },
    ]);
  };

  const handleChange = (name, value, inflationIndex, holdingYearIndex) => {
    let tempArr = JSON.parse(JSON.stringify(propertyInflations));
    if(name === "inflationPercentage"){
      tempArr[inflationIndex].holdingYears[holdingYearIndex][name] = value < 0 ? 0 : value > 100 ? 100 : value;
    }
    else{
      tempArr[inflationIndex][name] = value;
    }
    setPropertyInflations(tempArr);
  };

  const saveInflation = () => {
    dispatch(updatePropertyInflation({ user, propertyId: id, propertyInflations }));
  }
  const none = () =>{
    return;
  }

  return (
    <section
      id="Inflation-Profiles"
      className="container-fluid section-top-padding"
    >
      <div className="row">
        <div className="col-12">
          <div className="card">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">303 Sungarden Spring</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Proforma Assumptions
                </li>
              </ol>
            </nav>
            <h4>Inflation Profiles</h4>
            {propertyInflations && (
              <Fragment>
                <div className="inflation-table-container">
                  <table
                    id="Inflation"
                    className="table nowrap Inflation inflation-table"
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        {propertyInflations[0].holdingYears.map(
                          (holdingYear, index) => (
                            <th>Year {holdingYear.year}</th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {propertyInflations.map((inflation, inflationIndex) => (
                        <tr key={inflationIndex}>
                          <td className="headcol">
                            <input
                              type="text"
                              className="form-control inflation-name"
                              id="formGroupExampleInput"
                              name="inflationType"
                              placeholder={inflation.inflationType}
                              value={inflation.inflationType}
                              disabled={inflationIndex < 3}
                              onChange={inflationIndex >= 3 ? (e) =>
                                handleChange(
                                  e.target.name,
                                  e.target.value,
                                  inflationIndex,
                                  ""
                                ): none}
                            />
                          </td>
                          {inflation.holdingYears.map(
                            (holdingYear, holdingYearIndex) => (
                              <td key={holdingYearIndex}>
                                <div className="input-group inflation-value">
                                  <input
                                    type="number"
                                    id="holdingPeriod"
                                    className="form-control"
                                    placeholder="0.00"
                                    aria-label="Years"
                                    aria-describedby="holdingYears"
                                    value={holdingYear.inflationPercentage}
                                    name="inflationPercentage"
                                    onChange={(e) =>
                                      handleChange(
                                        e.target.name,
                                        e.target.value,
                                        inflationIndex,
                                        holdingYearIndex
                                      )
                                    }
                                  />
                                  <span
                                    className="input-group-text"
                                    id="holdingYears"
                                  >
                                    %
                                  </span>
                                </div>
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <button
                    className="btn btn-success m-1"
                    onClick={saveInflation}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() =>
                      addNewInflation(propertyInflations[0].holdingYears.length)
                    }
                  >
                    Add New
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InflationProfile;
