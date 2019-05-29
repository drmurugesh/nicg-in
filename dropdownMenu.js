// dropdownMenu creation
export const dropdownMenu = (selection, props) => {
  const {
    options,
    onOptionClicked,
    selectedOption
  } = props;
  
// selecting the data
  let select = selection.selectAll('select').data([null]);
  select = select.enter().append('select')
    .merge(select)
      .on('change', function() {
        onOptionClicked(this.value);
      });
  
// creating option and setting the value and text attribute
  const option = select.selectAll('option').data(options);
  option.enter().append('option')
    .merge(option)
      .attr('value', d => d)
      .property('selected', d => d === selectedOption)
      .text(d => d);
};