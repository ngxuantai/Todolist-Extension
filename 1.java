public void listAttendance(ArrayList<Employee> employees, int month, int year) {
    System.out.println("Danh sách chấm công tháng " + month + "/" + year + ":");
    System.out.println("Mã NV\tTên NV\tSố ngày công\tSố ngày nghỉ có phép\tSố ngày nghỉ không phép\tLương tháng");
    for (Employee employee : employees) {
        double salary = 0;
        int workDays = 0;
        int leaveDaysWithReason = 0;
        int leaveDaysWithoutReason = 0;
        if (employee instanceof IndirectEmployee) {
            IndirectEmployee indirectEmployee = (IndirectEmployee) employee;
            for (Attendance attendance : indirectEmployee.getAttendanceList()) {
                if (attendance.getMonth() == month && attendance.getYear() == year) {
                    workDays += attendance.getWorkDays();
                    leaveDaysWithReason += attendance.getLeaveDaysWithReason();
                    leaveDaysWithoutReason += attendance.getLeaveDaysWithoutReason();
                    salary += indirectEmployee.calculateSalary(attendance.getWorkDays(), attendance.getLeaveDaysWithReason());
                }
            }
        } else if (employee instanceof DirectEmployee) {
            DirectEmployee directEmployee = (DirectEmployee) employee;
            for (Attendance attendance : directEmployee.getAttendanceList()) {
                if (attendance.getMonth() == month && attendance.getYear() == year) {
                    workDays += attendance.getWorkDays();
                    leaveDaysWithReason += attendance.getLeaveDaysWithReason();
                    leaveDaysWithoutReason += attendance.getLeaveDaysWithoutReason();
                    salary += directEmployee.calculateSalary(attendance.getWorkDays(), attendance.getLeaveDaysWithReason(), attendance.getAllowance());
                }
            }
        }
        System.out.println(employee.getId() + "\t" + employee.getName() + "\t" + workDays + "\t" + leaveDaysWithReason + "\t" + leaveDaysWithoutReason + "\t" + salary);
    }
}
