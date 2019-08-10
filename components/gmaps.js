export default ({load}) => {
    return (
        <div>
            <script type="text/javascript" async onLoad={load()} 
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAmQxdwHvGIR3zuTVfybAWZxYIePmtXI-4&libraries=places"></script>
        </div>
    )
}